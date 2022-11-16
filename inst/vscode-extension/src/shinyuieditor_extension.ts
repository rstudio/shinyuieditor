/* eslint-disable no-console */
import type { MessageFromBackend } from "communication-types";
import { isMessageFromClient } from "communication-types";
import * as vscode from "vscode";

import type { ActiveRSession } from "./R-Utils/getRProcess";
import { getRProcess } from "./R-Utils/getRProcess";
import { getAppFile } from "./R-Utils/parseAppFile";
import { getNonce } from "./util";

/**
 * Provider for cat scratch editors.
 *
 * Cat scratch editors are used for `.cscratch` files, which are just json files.
 * To get started, run this extension and open an empty `.cscratch` file in VS Code.
 *
 * This provider demonstrates:
 *
 * - Setting up the initial webview for a custom editor.
 * - Loading scripts and styles in a custom editor.
 * - Synchronizing changes between a text document and a custom editor.

*/
export class ShinyUiEditorProvider implements vscode.CustomTextEditorProvider {
  private RProcess: ActiveRSession | null = null;
  private static readonly viewType = "shinyUiEditor.appFile";

  private sendMessage: ((msg: MessageFromBackend) => Thenable<boolean>) | null =
    null;

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new ShinyUiEditorProvider(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      ShinyUiEditorProvider.viewType,
      provider
    );
    return providerRegistration;
  }

  constructor(private readonly context: vscode.ExtensionContext) {
    getRProcess().then((rProc) => {
      this.RProcess = rProc;
    });
    console.log("extension constructor()!");
  }

  /**
   * Called when our custom editor is opened.
   *
   *
   */
  public async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    console.log("Editor window is opened!", document.fileName);

    // Setup initial content for the webview
    webviewPanel.webview.options = { enableScripts: true };
    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

    // Hook up event handlers so that we can synchronize the webview with the text document.
    //
    // The text document acts as our model, so we have to sync change in the document to our
    // editor and sync changes in the editor back to the document.
    //
    // Remember that a single text document can also be shared between multiple custom
    // editors (this happens for example when you split a custom editor)
    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(
      (e) => {
        if (e.document.uri.toString() === document.uri.toString()) {
          // updateWebview();
          console.log("New text file in view!");
        }
      }
    );

    // Make sure we get rid of the listener when our editor window is closed.
    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose();
      console.log("Editor window closed");
      // this.RProcess?.stop();
    });

    // Receive message from the webview.
    webviewPanel.webview.onDidReceiveMessage((e) => {
      if (isMessageFromClient(e)) {
        console.log("Message from client!", e);
        switch (e.path) {
          case "READY-FOR-STATE": {
            if (!this.RProcess) {
              return;
            }
            getAppFile(document.getText(), this.RProcess).then((parsedApp) => {
              this.sendMessage?.({
                path: "UPDATED-TREE",
                payload: parsedApp.ui_tree,
              });
            });

            return;
          }
          default: {
            console.warn("Unhandled message from client", e);
          }
        }
      } else {
        console.log("Unknown message from webview", e);
      }
    });

    this.sendMessage = (msg: MessageFromBackend) =>
      webviewPanel.webview.postMessage(msg);
  }

  /**
   * Get the static html used for the editor webviews.
   */
  private getHtmlForWebview(webview: vscode.Webview): string {
    // Local path to script and css for the webview
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "media",
        "build",
        "bundle.js"
      )
    );

    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "media",
        "build",
        "bundle.css"
      )
    );

    // Use a nonce to whitelist which scripts can be run
    const nonce = getNonce();

    return /* html */ `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<script>
				// This is needed for various older packages that require the global
				// object to be defined because it typically was with older bundlers like
				// webpack
				var global = window;
			  </script>
				<!--
				Use a content security policy to only allow loading images from https or from our extension directory,
				and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} data:; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				
				<link href="${styleMainUri}" rel="stylesheet" />
				
				<title>Shiny UI Editor</title>
			</head>
			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root" style="height: 100vh; display: relative"></div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }

  /**
   * Write out the json to a given document.
   */
  private updateTextDocument(document: vscode.TextDocument, json: any) {
    const edit = new vscode.WorkspaceEdit();

    // Just replace the entire document every time for this example extension.
    // A more complete extension should compute minimal edits instead.
    edit.replace(
      document.uri,
      new vscode.Range(0, 0, document.lineCount, 0),
      JSON.stringify(json, null, 2)
    );

    return vscode.workspace.applyEdit(edit);
  }
}
