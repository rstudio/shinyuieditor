import {
  get_assignment_nodes,
  get_output_positions,
} from "ast-parsing/src/get_assignment_nodes";
import type { R_AST } from "ast-parsing/src/r_ast";
import type { OutputSourceRequest } from "communication-types";
import * as vscode from "vscode";

import { getAppAST } from "./R-Utils/getAppAST";
import type { ActiveRSession } from "./R-Utils/startBackgroundRProcess";

export async function selectOutputReferences({
  editor,
  output: { outputId },
  RProcess,
}: {
  editor: vscode.TextEditor;
  output: OutputSourceRequest;
  RProcess: ActiveRSession;
}) {
  const app_text = editor.document.getText();

  const app_ast_res = await getAppAST(RProcess, app_text);

  const matches_for_output =
    app_ast_res.status === "success" && app_ast_res.values !== "EMPTY"
      ? find_with_ast(app_ast_res.values, outputId)
      : find_with_regex(app_text, outputId);

  if (!matches_for_output) {
    vscode.window.showErrorMessage(
      `Failed to find any current use of output$${outputId} in server`
    );
    return;
  }
  // Set the selection to found outputs
  editor.selection = matches_for_output[0];

  // Make sure that the user can actually see those outputs.
  editor.revealRange(matches_for_output[0]);
}

function find_with_ast(
  ast: R_AST,
  outputId: string
): vscode.Selection[] | null {
  const assignment_nodes = get_assignment_nodes(ast);
  const output_positions = get_output_positions(assignment_nodes);

  const position_for_output = output_positions[outputId];

  if (!position_for_output) return null;

  return position_for_output.map(([start_row, start_col, end_row, end_col]) => {
    const searchStart = new vscode.Position(start_row - 1, start_col - 1);
    const searchEnd = new vscode.Position(end_row - 1, end_col);
    return new vscode.Selection(searchStart, searchEnd);
  });
}

function find_with_regex(
  app_text: string,
  outputId: string
): vscode.Selection[] | null {
  const doc_lines = app_text.split("\n");
  const regex_for_output = new RegExp(`output\\$${outputId}`, "g");

  const lines_with_output = doc_lines
    .map((l, i) => ({
      line: i,
      match: regex_for_output.exec(l),
    }))
    .filter(({ match }) => match !== null);

  if (lines_with_output.length === 0) return null;

  return lines_with_output.map(({ line, match }) => {
    const startChar = match?.index ?? 0;
    const searchStart = new vscode.Position(line, startChar);
    // Add seven to account for length of "output$"
    const searchEnd = new vscode.Position(
      line,
      startChar + outputId.length + 7
    );

    return new vscode.Selection(searchStart, searchEnd);
  });
}
