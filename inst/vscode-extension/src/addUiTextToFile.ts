import * as vscode from "vscode";

import type { App_Location } from "./editorLogic";
import { uiBoundsToSelection } from "./extension-api-utils/uiBoundsToSelection";

export async function addUiTextToFile({
  text,
  document,
  uiBounds = { start_row: 0, end_row: 0, start_col: 0, end_col: 0 },
  type,
}: {
  text: string;
  document: vscode.TextDocument;
  uiBounds?: App_Location;
  type: "insert" | "replace";
}) {
  const uri = document.uri;
  const edit = new vscode.WorkspaceEdit();

  if (type === "replace") {
    const uiRange = uiBoundsToSelection(uiBounds);
    edit.replace(uri, uiRange, text);
  }

  if (type === "insert") {
    edit.insert(document.uri, new vscode.Position(0, 0), text);
  }

  await vscode.workspace.applyEdit(edit);

  // Save so app preview will update
  document.save();
}

export async function update_app_file({
  text,
  document,
}: {
  text: string;
  document: vscode.TextDocument;
}) {
  const uri = document.uri;
  const edit = new vscode.WorkspaceEdit();

  const full_selection = document.validateRange(
    new vscode.Selection(0, 0, document.lineCount + 1, 0)
  );

  edit.replace(uri, full_selection, text);

  await vscode.workspace.applyEdit(edit);

  // Save so app preview will update
  document.save();
}
