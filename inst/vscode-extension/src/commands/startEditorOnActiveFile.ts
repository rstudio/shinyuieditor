import * as vscode from "vscode";
import { window } from "vscode";

export function startEditorOnActiveFile(name: string = "world") {
  const activeEditor = window.activeTextEditor;

  if (!activeEditor) {
    window.showErrorMessage("No active file open to run ui editor on!");
    return;
  }

  vscode.commands.executeCommand(
    "vscode.openWith",
    activeEditor.document.uri,
    "shinyuieditor.appFile"
  );
}
