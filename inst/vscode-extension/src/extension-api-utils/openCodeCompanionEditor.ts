import * as vscode from "vscode";

/**
 * Open up a new plain text editor view of the given app next to the visual editor
 * @param appFile document that contains the app file as given by the `this.resolveCustomTextEditor` args
 * @returns Handle to the text file opened
 */
export async function openCodeCompanionEditor({
  document,
  existingEditor,
}: {
  document: vscode.TextDocument;
  existingEditor?: vscode.TextEditor;
}): Promise<vscode.TextEditor> {
  const alreadyHaveOpenEditor =
    existingEditor && vscode.window.visibleTextEditors.includes(existingEditor);

  // Avoid opening secondary companion editor
  const companionEditor = alreadyHaveOpenEditor
    ? existingEditor
    : await vscode.window.showTextDocument(document.uri, {
        viewColumn: vscode.ViewColumn.Beside,
        preview: true,
      });

  return companionEditor;
}
