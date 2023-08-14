import type { ServerPositions } from "communication-types/src/MessageToBackend";
import * as vscode from "vscode";

export function selectAppLines({
  editor,
  selections,
}: {
  editor: vscode.TextEditor;
  selections: ServerPositions;
}) {
  const selection_objs = selections.map((range) => {
    const start = new vscode.Position(range.start.row, range.start.column);
    const end = new vscode.Position(range.end.row, range.end.column);
    return new vscode.Selection(start, end);
  });

  // Set the selection to found outputs
  editor.selection = selection_objs[0];

  // Make sure that the user can actually see those outputs.
  editor.revealRange(selection_objs[0]);
}
