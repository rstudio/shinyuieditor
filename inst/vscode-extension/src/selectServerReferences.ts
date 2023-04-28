import type { InputSourceRequest } from "communication-types";
import type {
  Script_Position,
  SnippetInsertRequest,
} from "communication-types/src/MessageToBackend";
import { indent_text_block } from "util-functions/src/strings";
import * as vscode from "vscode";

export async function insert_code_snippet({
  editor,
  snippet,
  server_pos,
  where_in_server,
}: {
  editor: vscode.TextEditor;
  server_pos: Script_Position;
} & SnippetInsertRequest) {
  // This is an assumption that we should probably extract from the script
  // itself
  const INDENT_SPACES = 2;
  const [start_row, , end_row] = server_pos;

  // Fill in the template at bottom of server
  const where_to_insert = editor.document.validatePosition(
    new vscode.Position(
      where_in_server === "end" ? end_row - 2 : start_row - 2,
      Infinity
    )
  );

  const successfull_template_add = await editor.insertSnippet(
    new vscode.SnippetString(
      `\n  ${indent_text_block(snippet, INDENT_SPACES)}`
    ),
    where_to_insert
  );

  if (!successfull_template_add) {
    // Tell user there's nothing we can do.
    vscode.window.showErrorMessage(`Failed to add output scaffold`);
  }
}

export function select_app_lines({
  editor,
  selections,
}: {
  editor: vscode.TextEditor;
  selections: Script_Position[];
}) {
  const selection_objs = selections.map(
    ([start_row, start_col, end_row, end_col]) => {
      const start = new vscode.Position(start_row - 1, start_col - 1);
      const end = new vscode.Position(end_row - 1, end_col);
      return new vscode.Selection(start, end);
    }
  );

  // Set the selection to found outputs
  editor.selection = selection_objs[0];

  // Make sure that the user can actually see those outputs.
  editor.revealRange(selection_objs[0]);
}

export function findRInputReferences({
  editor,
  input: { inputId },
}: {
  editor: vscode.TextEditor;
  input: InputSourceRequest;
}) {
  const fullInput = `input$${inputId}`;
  const to_find = fullInput;
  const app_text = editor.document.getText();
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

  if (lines_with_output.length === 0) return [];

  return lines_with_output.map(({ line, match }) => {
    const startChar = match?.index ?? 0;
    const searchStart = new vscode.Position(line, startChar);
    // Add to account for length of prefix
    const searchEnd = new vscode.Position(line, startChar + to_find.length);

    return new vscode.Location(
      editor.document.uri,
      new vscode.Range(searchStart, searchEnd)
    );
  });
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function findPythonInputReferences({}) {}
