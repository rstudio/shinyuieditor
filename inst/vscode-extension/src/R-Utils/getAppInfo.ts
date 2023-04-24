import type { App_Info } from "communication-types/src/AppInfo";
import type { R_AST } from "r-ast-parsing";
import { parse_app_server_info } from "r-ast-parsing/src/parse_app_server_info";
import { raw_R_info_to_app_info } from "r-ast-parsing/src/raw_R_info_to_app_info";
import { is_object } from "util-functions/src/is_object";
import { makePortableString } from "util-functions/src/strings";
import type * as vscode from "vscode";

import type { CommandOutputGeneric } from "./runRCommand";
import type { ActiveRSession } from "./startBackgroundRProcess";

type INFO_GET_RESULTS =
  | {
      parsed_info: App_Info;
      server_info: ReturnType<typeof parse_app_server_info>;
    }
  | "EMPTY";

async function getAppInfo(
  rProc: ActiveRSession,
  fileText: string
): Promise<CommandOutputGeneric<INFO_GET_RESULTS>> {
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

    const raw_ast = output_response.ast;

    const parsed_info = raw_R_info_to_app_info({
      app_type: "SINGLE-FILE",
      app: { ast: raw_ast, script: fileText },
    });

    const server_info = parse_app_server_info(output_response.ast);

    return {
      status: "success",
      values: { parsed_info, server_info },
    };
  } catch {
    return {
      status: "error",
      errorMsg:
        "Something went wrong parsing app. Check to make sure your app text doesn't contain any syntax errors.",
    };
  }
}

type Safe_Info_Parse_Success = {
  type: "success";
  ast: R_AST;
};

type Safe_Info_Parse_Error = {
  type: "error";
  msg: string;
};

type Safe_Info_Parse_Response = Safe_Info_Parse_Success | Safe_Info_Parse_Error;

function assert_is_ast_parse_response(
  parse_res: unknown
): asserts parse_res is Safe_Info_Parse_Response {
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

export function make_cached_info_getter(
  document: vscode.TextDocument,
  rProc: ActiveRSession
) {
  let last_info_grabbed: {
    file_version: number;
    info: INFO_GET_RESULTS;
  } | null = null;

  async function get_info(): Promise<CommandOutputGeneric<INFO_GET_RESULTS>> {
    const current_file_version = document.version;

    if (current_file_version === last_info_grabbed?.file_version) {
      // Use cached ast since nothing has changed!
      return { status: "success", values: last_info_grabbed.info };
    }

    const info_attempt = await getAppInfo(rProc, document.getText());

    if (info_attempt.status === "error") {
      return info_attempt;
    }

    const ast_info = info_attempt.values;

    last_info_grabbed = {
      file_version: current_file_version,
      info: ast_info,
    };

    return info_attempt;
  }

  return get_info;
}
