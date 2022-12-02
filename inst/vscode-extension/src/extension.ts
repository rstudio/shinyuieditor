import * as vscode from "vscode";

import { startEditor } from "./commands/startEditor";
import { ShinyUiEditorProvider } from "./shinyuieditor_extension";

export function activate(context: vscode.ExtensionContext) {
  // Register our custom editor providers
  context.subscriptions.push(ShinyUiEditorProvider.register(context));
  context.subscriptions.push(
    vscode.commands.registerCommand("shinyUiEditor.startEditor", startEditor)
  );
}
