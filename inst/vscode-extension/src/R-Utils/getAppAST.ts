import type { R_AST } from "editor/src/ast_parsing/r_ast";
import type * as vscode from "vscode";

import { escapeDoubleQuotes, collapseText } from "../string-utils";

import type { CommandOutputGeneric } from "./runRCommand";
import type { ActiveRSession } from "./startBackgroundRProcess";

async function getAppAST(
  rProc: ActiveRSession,
  fileText: string
): Promise<CommandOutputGeneric<R_AST | "EMPTY">> {
  const escapedAppText = escapeDoubleQuotes(fileText);

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

    return { status: "success", values: parsedAST };
  } catch {
    return {
      status: "error",
      errorMsg: "Could not get document as json. Content is not valid json",
    };
  }
}

export type App_AST_Getter = () => Promise<
  CommandOutputGeneric<"EMPTY" | R_AST>
>;

/**
 * Builds a function that will return the raw ast from a given R shiny app. Will
 * use caching in order to avoid repeating work.
 * @param RProcess Background R process to make calls to
 * @param app_document Document object representing the app we're working with
 * @returns Output of running R command to get parsed AST on the current
 * document.
 */
export function setup_app_ast_getter(
  RProcess: ActiveRSession,
  app_document: vscode.TextDocument
): App_AST_Getter {
  let previous_ast: CommandOutputGeneric<"EMPTY" | R_AST> | null = null;
  let previous_app_version: number | null = null;

  async function get_ast(): Promise<CommandOutputGeneric<"EMPTY" | R_AST>> {
    const current_app_version = app_document.version;

    if (current_app_version === previous_app_version && previous_ast) {
      return previous_ast;
    }

    previous_app_version = current_app_version;
    previous_ast = await getAppAST(RProcess, app_document.getText());

    return previous_ast;
  }

  return get_ast;
}
