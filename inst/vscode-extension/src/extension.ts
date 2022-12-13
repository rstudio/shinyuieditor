import * as vscode from "vscode";

import { launchEditor } from "./commands/launchEditor";
import { startEditorOnActiveFile } from "./commands/startEditorOnActiveFile";
import { ShinyUiEditorProvider } from "./shinyuieditor_extension";

export function activate(context: vscode.ExtensionContext) {
  // Register our custom editor providers
  context.subscriptions.push(ShinyUiEditorProvider.register(context));
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "shinyuieditor.startEditorOnActiveFile",
      startEditorOnActiveFile
    ),
    vscode.commands.registerCommand("shinyuieditor.launchEditor", launchEditor)
  );
}
