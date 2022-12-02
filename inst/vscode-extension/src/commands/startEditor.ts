import path from "path";

import * as vscode from "vscode";
import { window } from "vscode";

function isRFile(filePath: path.ParsedPath) {
  const extension = filePath.ext;
  return /\.R/i.test(extension);
}

export function startEditor(name: string = "world") {
  const activeEditor = window.activeTextEditor;

  if (!activeEditor) {
    window.showErrorMessage("No active file open to run ui editor on!");
    return;
  }

  const activeEditorPath = path.parse(activeEditor.document.fileName);

  if (!isRFile(activeEditorPath)) {
    window.showErrorMessage(
      `Can't run the ui editor on the currently active file ${activeEditorPath.base}, needs to be a .R file.`
    );
    return;
  }

  vscode.commands.executeCommand(
    "vscode.openWith",
    activeEditor.document.uri,
    "shinyUiEditor.appFile"
  );
}
