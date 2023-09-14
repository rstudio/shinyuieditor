import * as vscode from "vscode";

/**
 * Wipe app file clear
 */
export async function clearAppFile(document: vscode.TextDocument) {
  const uri = document.uri;
  const edit = new vscode.WorkspaceEdit();

  const uiRange = document.validateRange(
    new vscode.Range(0, 0, Infinity, Infinity)
  );

  edit.replace(uri, uiRange, "");

  await vscode.workspace.applyEdit(edit);

  // Save so app preview will update
  document.save();
}
