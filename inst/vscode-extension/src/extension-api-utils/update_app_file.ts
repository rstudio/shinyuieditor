import * as vscode from "vscode";

/**
 * Make sure that the app file in the document object contains the same script text as we provide.
 * @param script_text_and_document
 * @returns Promise of boolean indicating if the document text was actually changed
 */
export async function update_app_file({
  script_text,
  document,
}: {
  script_text: string;
  document: vscode.TextDocument;
}): Promise<boolean> {
  const existing_app_text = document.getText();

  if (script_text === existing_app_text) {
    // Don't rewrite the same app and trigger reloading loops.
    return false;
  }

  const uri = document.uri;
  const edit = new vscode.WorkspaceEdit();

  const full_selection = document.validateRange(
    new vscode.Selection(0, 0, document.lineCount + 1, 0)
  );

  edit.replace(uri, full_selection, script_text);

  await vscode.workspace.applyEdit(edit);

  // Save so app preview will update
  document.save();

  return true;
}
