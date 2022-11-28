import type * as vscode from "vscode";

import { ShinyUiEditorProvider } from "./shinyuieditor_extension";

export function activate(context: vscode.ExtensionContext) {
  // Register our custom editor providers
  context.subscriptions.push(ShinyUiEditorProvider.register(context));
}
