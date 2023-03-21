import type { R_AST } from "r-ast-parsing";
import { parse_app_server_info } from "r-ast-parsing/src/parse_app_server_info";
import { is_object } from "util-functions/src/is_object";
import { makePortableString } from "util-functions/src/strings";
import type * as vscode from "vscode";

import type { CommandOutputGeneric } from "./runRCommand";
import type { ActiveRSession } from "./startBackgroundRProcess";

type AST_GET_RESULTS =
  | { ast: R_AST; server_info: ReturnType<typeof parse_app_server_info> }
  | "EMPTY";
async function getAppAST(
  rProc: ActiveRSession,
  fileText: string
): Promise<CommandOutputGeneric<AST_GET_RESULTS>> {
  const escapedAppText = makePortableString(fileText);

  const parseCommand = `shinyuieditor:::safe_parse_and_serialize("${escapedAppText}")`;

  const parsedCommandOutput = await rProc.runCmd(parseCommand, {
    verbose: false,
    timeout_ms: 5000,
  });

  if (parsedCommandOutput.status === "error") {
    return parsedCommandOutput;
  }

  try {
    const output_response = JSON.parse(
      parsedCommandOutput.values.reduce((all, l) => all + "\n" + l, "")
    );

    assert_is_ast_parse_response(output_response);

    if (output_response.type === "error") {
      return {
        status: "error",
        errorMsg: output_response.msg,
      };
    }

    // Nothing will get returned if we've provided an empty file
    if (Object.keys(output_response.ast).length === 0) {
      return { status: "success", values: "EMPTY" };
    }

    const server_info = parse_app_server_info(output_response.ast);

    return {
      status: "success",
      values: { ast: output_response.ast, server_info },
    };
  } catch {
    return {
      status: "error",
      errorMsg:
        "Something went wrong parsing app. Check to make sure your app text doesn't contain any syntax errors.",
    };
  }
}

type Safe_AST_Parse_Success = {
  type: "success";
  ast: R_AST;
};

type Safe_AST_Parse_Error = {
  type: "error";
  msg: string;
};

type Safe_AST_Parse_Response = Safe_AST_Parse_Success | Safe_AST_Parse_Error;

function assert_is_ast_parse_response(
  parse_res: unknown
): asserts parse_res is Safe_AST_Parse_Response {
  if (
    is_object(parse_res) &&
    "type" in parse_res &&
    (parse_res.type === "success" || parse_res.type === "error")
  ) {
    return;
  }

  throw new Error(
    "Parse result does not appear to be from safe ast parse function"
  );
}

export function make_cached_ast_getter(
  document: vscode.TextDocument,
  rProc: ActiveRSession
) {
  let last_ast_grabbed: {
    file_version: number;
    ast_info: AST_GET_RESULTS;
  } | null = null;

  async function get_ast(): Promise<CommandOutputGeneric<AST_GET_RESULTS>> {
    const current_file_version = document.version;

    if (current_file_version === last_ast_grabbed?.file_version) {
      // Use cached ast since nothing has changed!
      return { status: "success", values: last_ast_grabbed.ast_info };
    }

    const ast_get_attempt = await getAppAST(rProc, document.getText());

    if (ast_get_attempt.status === "error") {
      return ast_get_attempt;
    }

    const ast_info = ast_get_attempt.values;

    last_ast_grabbed = {
      file_version: current_file_version,
      ast_info,
    };

    return ast_get_attempt;
  }

  return get_ast;
}
