import type { R_AST } from "r-ast-parsing";
import { parse_app_server_info } from "r-ast-parsing/src/parse_app_server_info";
import { makePortableString, collapseText } from "util-functions/src/strings";
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

  const parseCommand = collapseText(
    `app_lines <- strsplit("${escapedAppText}", "\\n")[[1]]`,
    `parsed <- parse(text = app_lines, keep.source = TRUE)`,
    `jsonlite::toJSON(`,
    `  shinyuieditor:::serialize_ast(parsed),`,
    `  auto_unbox = TRUE`,
    `)`
  );

  const parsedCommandOutput = await rProc.runCmd(parseCommand, {
    verbose: false,
    timeout_ms: 5000,
  });

  if (parsedCommandOutput.status === "error") {
    return parsedCommandOutput;
  }

  try {
    const parsedAST = JSON.parse(
      parsedCommandOutput.values.reduce((all, l) => all + "\n" + l, "")
    );

    // Nothing will get returned if we've provided an empty file
    if (Object.keys(parsedAST).length === 0) {
      return { status: "success", values: "EMPTY" };
    }

    const server_info = parse_app_server_info(parsedAST);

    return { status: "success", values: { ast: parsedAST, server_info } };
  } catch {
    return {
      status: "error",
      errorMsg: "Could not get document as json. Content is not valid json",
    };
  }
}

export function make_cached_ast_getter(document: vscode.TextDocument) {
  let last_ast_grabbed: {
    file_version: number;
    ast_info: AST_GET_RESULTS;
  } | null = null;

  async function get_ast(
    rProc: ActiveRSession
  ): Promise<CommandOutputGeneric<AST_GET_RESULTS>> {
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
