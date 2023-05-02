import type {
  Script_Range,
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
  server_pos: Script_Range;
} & SnippetInsertRequest) {
  // This is an assumption that we should probably extract from the script
  // itself
  const INDENT_SPACES = 2;
  // const  = server_pos;

  // Fill in the template at bottom of server
  const where_to_insert = editor.document.validatePosition(
    new vscode.Position(
      where_in_server === "end"
        ? server_pos.end.row - 2
        : server_pos.start.row - 2,
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
  selections: Script_Range[];
}) {
  const selection_objs = selections.map((range) => {
    const start = new vscode.Position(range.start.row - 1, range.start.column);
    const end = new vscode.Position(range.end.row - 1, range.end.column);
    return new vscode.Selection(start, end);
  });

  // Set the selection to found outputs
  editor.selection = selection_objs[0];

  // Make sure that the user can actually see those outputs.
  editor.revealRange(selection_objs[0]);
}
