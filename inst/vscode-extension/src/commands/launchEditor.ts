import { Uri, window, workspace } from "vscode";
import * as vscode from "vscode";

import {
  defaultAppName,
  emptyAppContent,
  validateAppFileName,
} from "./appFileUtils";
/**
 * Asks user to choose the location for their new app, writes an app.R location
 * there and then starts up the editor on that empty file
 */
export async function launchEditor() {
  const uri = await window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: true,
    title: "Choose location for Shiny app",
    openLabel: "Choose app folder or file",
    canSelectMany: false,
    filters: {
      "R scripts": ["R", "r"],
    },
  });

  if (!uri) return;

  const selection = uri[0];

  const isDirectory =
    (await vscode.workspace.fs.stat(selection)).type ===
    vscode.FileType.Directory;

  // If the user chose a direrectory, ask them what to call the app
  const newAppFile = isDirectory
    ? await getAppFileFromDirectory(selection)
    : selection;

  if (!newAppFile) {
    return;
  }

  vscode.commands.executeCommand(
    "vscode.openWith",
    newAppFile,
    "shinyUiEditor.appFile"
  );
}

async function getAppFileFromDirectory(appDir: Uri) {
  const existingFilesInFolder = (await workspace.fs.readDirectory(appDir))
    .filter(([_, type]) => type === vscode.FileType.File)
    .map(([name, _]) => name);

  const nameForFile = await window.showInputBox({
    prompt: "Enter file name for new app",
    placeHolder: defaultAppName,
    validateInput(inputName: string) {
      const validatedName = validateAppFileName(inputName);

      if (!validatedName.valid) {
        return {
          message: validatedName.msg,
          severity: vscode.InputBoxValidationSeverity.Error,
        };
      }

      if (existingFilesInFolder.includes(validatedName.name)) {
        return {
          message: `Run the editor on existing app: ${validatedName.name}.`,
          severity: vscode.InputBoxValidationSeverity.Info,
        };
      }

      return {
        message: `Run the template chooser to build new app: ${validatedName.name}.`,
        severity: vscode.InputBoxValidationSeverity.Info,
      };
    },
  });
  // result us undefined if the user dismissed prompt with escape, just end early in that case
  if (!nameForFile) {
    return;
  }

  const validatedName = validateAppFileName(nameForFile);

  if (!validatedName.valid) {
    vscode.window.showErrorMessage(
      `Error processing requested file name: ${nameForFile}. Try with a different name.`
    );
    return;
  }

  const newAppFile = Uri.joinPath(appDir, validatedName.name);

  // Check to make sure file doesn't exist already before overwriting
  const alreadyExists = existingFilesInFolder.includes(validatedName.name);
  if (!alreadyExists) {
    await workspace.fs.writeFile(newAppFile, emptyAppContent);
  }

  return newAppFile;
}
