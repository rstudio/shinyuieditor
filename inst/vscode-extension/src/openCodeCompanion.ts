import * as vscode from "vscode";

/**
 * Open up a new plain text editor view of the given app next to the visual editor
 * @param appFile document that contains the app file as given by the `this.resolveCustomTextEditor` args
 * @returns Handle to the text file opened
 */
export async function openCodeCompanion(appFile: vscode.TextDocument) {
  return await vscode.window.showTextDocument(appFile.uri, {
    viewColumn: vscode.ViewColumn.Beside,
  });
}
