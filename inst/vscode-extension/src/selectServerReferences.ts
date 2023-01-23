import type { Output_Server_Pos } from "ast-parsing/src/get_assignment_nodes";
import type {
  InputSourceRequest,
  OutputSourceRequest,
} from "communication-types";
import * as vscode from "vscode";

import type { App_Parser } from "./R-Utils/parseRApp";

export async function selectOutputReferences({
  editor,
  output: { outputId },
  get_ast,
}: {
  editor: vscode.TextEditor;
  get_ast: App_Parser;
  output: OutputSourceRequest;
}) {
  const app_text = editor.document.getText();

  const app_ast_res = await get_ast();

  const fullOutput = `output$${outputId}`;

  const matches_for_output =
    app_ast_res.type === "SUCCESS"
      ? find_with_ast(app_ast_res.output_positions, outputId)
      : find_with_regex(app_text, fullOutput);

  if (!matches_for_output) {
    vscode.window.showErrorMessage(
      `Failed to find any current use of ${fullOutput} in server`
    );
    return;
  }
  selectInEditor(editor, matches_for_output);
  // Set the selection to found outputs
  editor.selection = matches_for_output[0];

  // Make sure that the user can actually see those outputs.
  editor.revealRange(matches_for_output[0]);
}

export async function selectInputReferences({
  editor,
  input: { inputId },
}: {
  editor: vscode.TextEditor;
  input: InputSourceRequest;
}) {
  const fullInput = `input$${inputId}`;
  const matches_for_input = find_with_regex(
    editor.document.getText(),
    fullInput
  );

  if (!matches_for_input) {
    vscode.window.showErrorMessage(
      `Failed to find any current use of ${fullInput} in server`
    );
    return;
  }
  selectInEditor(editor, matches_for_input);
}

function selectInEditor(
  editor: vscode.TextEditor,
  selections: vscode.Selection[]
) {
  // Set the selection to found outputs
  editor.selection = selections[0];

  // Make sure that the user can actually see those outputs.
  editor.revealRange(selections[0]);
}

function find_with_ast(
  output_positions: Output_Server_Pos,
  outputId: string
): vscode.Selection[] | null {
  const position_for_output = output_positions[outputId];

  if (!position_for_output) return null;

  return position_for_output.map(([start_row, start_col, end_row, end_col]) => {
    const searchStart = new vscode.Position(start_row - 1, start_col - 1);
    const searchEnd = new vscode.Position(end_row - 1, end_col);
    return new vscode.Selection(searchStart, searchEnd);
  });
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function find_with_regex(
  app_text: string,
  to_find: string
): vscode.Selection[] | null {
  const doc_lines = app_text.split("\n");

  // To find valid examples we want to check:
  // 1. That we're not looking after a comment, aka not active code. and
  // 2. That right after our searched for variable we have a non word token to
  //    avoid over-eager findings like input$bins2 matching when we're searching
  //    for input$bins
  const regex_for_output = new RegExp(
    `(?<!#.*)${escapeRegExp(to_find)}(?=\\W)`
  );

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
    // Add to account for length of prefix
    const searchEnd = new vscode.Position(line, startChar + to_find.length);

    return new vscode.Selection(searchStart, searchEnd);
  });
}
