import { parse_app_ast } from "ast-parsing/src/ast_to_shiny_ui_node";
import type { R_AST } from "editor/src/ast_parsing/r_ast";
import type * as vscode from "vscode";

import type { App_Location } from "../editorLogic";

import { getAppAST } from "./getAppAST";
import type { CommandOutputGeneric } from "./runRCommand";
import type { ActiveRSession } from "./startBackgroundRProcess";

type AST_Result =
  | ({
      type: "SUCCESS";
      ui_pos: App_Location;
    } & Omit<ReturnType<typeof parse_app_ast>, "ui_pos">)
  | {
      type: "EMPTY";
    }
  | {
      type: "ERROR";
      message: string;
    };

export type App_Parser = () => Promise<AST_Result>;

/**
 * Builds a function that will return the raw ast from a given R shiny app. Will
 * use caching in order to avoid repeating work.
 * @param RProcess Background R process to make calls to
 * @param app_document Document object representing the app we're working with
 * @returns Output of running R command to get parsed AST on the current
 * document.
 */
export function setup_app_parser(
  RProcess: ActiveRSession,
  app_document: vscode.TextDocument
): App_Parser {
  let previous_ast: AST_Result | null = null;
  let previous_app_version: number | null = null;

  async function get_ast(): Promise<AST_Result> {
    const current_app_version = app_document.version;

    if (current_app_version === previous_app_version && previous_ast) {
      return previous_ast;
    }

    previous_app_version = current_app_version;

    const raw_ast_output = await getAppAST(RProcess, app_document.getText());

    previous_ast = parse_fresh_app(raw_ast_output);

    return previous_ast;
  }

  return get_ast;
}

function parse_fresh_app(
  raw_ast_output: CommandOutputGeneric<R_AST | "EMPTY">
): AST_Result {
  if (raw_ast_output.status === "error") {
    return {
      type: "ERROR",
      message: raw_ast_output.errorMsg,
    };
  }

  if (raw_ast_output.values === "EMPTY") {
    return { type: "EMPTY" };
  }

  const {
    ui_tree,
    ui_pos: [start_row, start_col, end_row, end_col],
    ui_assignment_operator,
    output_positions,
  } = parse_app_ast(raw_ast_output.values);

  return {
    type: "SUCCESS",
    ui_tree,
    ui_pos: { start_row, start_col, end_row, end_col },
    ui_assignment_operator,
    output_positions,
  };
}
