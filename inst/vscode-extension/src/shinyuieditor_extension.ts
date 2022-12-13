/* eslint-disable no-console */
import type { MessageToClient } from "communication-types";
import * as vscode from "vscode";

import { editorLogic } from "./editorLogic";
import { appScriptStatus } from "./R-Utils/appScriptStatus";
import type { ActiveRSession } from "./R-Utils/startBackgroundRProcess";
import { startBackgroundRProcess } from "./R-Utils/startBackgroundRProcess";
import { getNonce } from "./util";

/**
 * Provider for custom editor.
 *
 */
export class ShinyUiEditorProvider implements vscode.CustomTextEditorProvider {
  private RProcess: ActiveRSession | null = null;

  private static readonly viewType = "shinyuieditor.appFile";

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new ShinyUiEditorProvider(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      ShinyUiEditorProvider.viewType,
      provider,
      {
        webviewOptions: {
          // Make it so the app stays alive if it's not the main tab, avoids
          // unneccesary refreshes. May be worth removing this in favor of cold
          // startups everytime tab is focused if memory usage etc becomes an
          // issue
          retainContextWhenHidden: true,
        },
      }
    );
    return providerRegistration;
  }

  constructor(private readonly context: vscode.ExtensionContext) {
    // Spin up background R process for things like formatting code etc.
    startBackgroundRProcess().then((rProc) => {
      this.RProcess = rProc;
    });
  }

  /**
   * Called when an instance of the custom editor is opened.
   *
   * The `document` arg will correspond to the associated app.R or ui.R file for this editor view.
   * By keeping logic in here we will ensure we don't get mixed up when we have multiple editor windows open.
   */
  public async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    const isInvalidAppScript = appScriptStatus(document) === "invalid";

    if (isInvalidAppScript) {
      const errMsg = `The active file doesn't appear to be a Shiny app. Make sure that the script is either empty or has a valid shiny app in it.`;
      vscode.window.showErrorMessage(errMsg);
      webviewPanel.dispose();
      throw new Error(errMsg);
    }
    // Setup initial content for the webview
    webviewPanel.webview.options = {
      enableScripts: true,
    };

    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

    if (!this.RProcess) {
      throw new Error("Don't have an R Process to pass to editor backend!");
    }

    const editorBackend = editorLogic({
      RProcess: this.RProcess,
      document,
      sendMessage: (msg: MessageToClient) =>
        webviewPanel.webview.postMessage(msg),
    });

    // Filter change and save events do only this current document
    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(
      (e) => {
        if (e.document.uri.toString() === document.uri.toString()) {
          editorBackend.onDocumentChanged();
        }
      }
    );
    const saveDocumentSubscription = vscode.workspace.onDidSaveTextDocument(
      (savedDocument) => {
        if (savedDocument.uri.toString() === document.uri.toString()) {
          // Make sure to immediately fire any changes to sync on save so there's not a lag.
          editorBackend.onDocumentSaved();
        }
      }
    );

    const onMessageSubscription = webviewPanel.webview.onDidReceiveMessage(
      editorBackend.onDidReceiveMessage
    );

    // Cleanup listeners etc when we close app file
    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose();
      saveDocumentSubscription.dispose();
      onMessageSubscription.dispose();
    });
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

    const cspSource = webview.cspSource;
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
				<meta 
          http-equiv="Content-Security-Policy" 
          content="default-src 'none'; frame-src http://localhost:*/ ${cspSource} https:; img-src ${cspSource} data:; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				
				<link href="${styleMainUri}" rel="stylesheet" />
				
				<title>Shiny UI Editor</title>
			</head>
			<body style="padding-inline: 0;">
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root" style="height: 100vh; display: relative"></div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }
}
