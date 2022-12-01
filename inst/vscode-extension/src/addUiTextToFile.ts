import * as vscode from "vscode";

import { uiBoundsToSelection } from "./extension-api-utils/uiBoundsToSelection";
import type { ParsedApp } from "./R-Utils/parseAppFile";

export async function addUiTextToFile({
  text,
  document,
  uiBounds = { start: 0, end: 0 },
  type,
}: {
  text: string;
  document: vscode.TextDocument;
  uiBounds?: ParsedApp["ui_bounds"];
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
