/* eslint-disable no-console */
import type { MessageFromBackend } from "communication-types";
import { isMessageFromClient } from "communication-types";
import type { ShinyUiNode } from "editor";
import debounce from "just-debounce-it";
import * as vscode from "vscode";

import { checkIfPkgAvailable } from "./R-Utils/checkIfPkgAvailable";
import { generateAppTemplate } from "./R-Utils/generateAppTemplate";
import { generateUpdatedUiCode } from "./R-Utils/generateUpdatedUiCode";
import type { ParsedApp } from "./R-Utils/parseAppFile";
import { getAppFile } from "./R-Utils/parseAppFile";
import type { ActiveRSession } from "./R-Utils/startBackgroundRProcess";
import { startBackgroundRProcess } from "./R-Utils/startBackgroundRProcess";
import { startPreviewApp } from "./R-Utils/startPreviewApp";
import { collapseText } from "./string-utils";
import { getNonce } from "./util";

const { showErrorMessage } = vscode.window;

/**
 * Provider for custom editor.
 *
 */
export class ShinyUiEditorProvider implements vscode.CustomTextEditorProvider {
  private RProcess: ActiveRSession | null = null;
  private uiBounds: ParsedApp["ui_bounds"] | null = null;
  private hasInitialized: boolean = false;

  private static readonly viewType = "shinyUiEditor.appFile";

  private sendMessage: ((msg: MessageFromBackend) => Thenable<boolean>) | null =
    null;

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
   * Open up a new plain text editor view of the given app next to the visual editor
   * @param appFile document that contains the app file as given by the `this.resolveCustomTextEditor` args
   * @returns Handle to the text file opened
   */
  private async openCodeCompanion(appFile: vscode.TextDocument) {
    return await vscode.window.showTextDocument(appFile.uri, {
      viewColumn: vscode.ViewColumn.Beside,
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
    // Setup initial content for the webview
    webviewPanel.webview.options = {
      enableScripts: true,
    };

    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);
    let latestAppWrite: string | null = null;

    /**
     * Plain text editor with apps code side-by-side with custom editor
     */
    let codeCompanionEditor: vscode.TextEditor | null = null;

    const syncFileToClientState = async () => {
      if (!this.RProcess) {
        throw new Error(
          "Failed to sync file state to client, no R process available"
        );
      }

      console.log("Generating app state");
      const appFileText = document.getText();

      // Check to make sure we're not just picking up a change that we made
      const updateWeMade =
        latestAppWrite !== null && appFileText.includes(latestAppWrite);

      // Skip unneccesary app file parsing
      if (updateWeMade) return;

      // If it's our first time connecting to the viewer, load our libraries and
      // let the user know if this failed and they need to fix it.
      if (!this.hasInitialized) {
        const pkgsLoaded = await checkIfPkgAvailable(
          this.RProcess,
          "shinyuieditor"
        );

        if (pkgsLoaded.status === "error") {
          this.sendMessage?.({
            path: "BACKEND-ERROR",
            payload: pkgsLoaded.msg,
          });
          showErrorMessage(pkgsLoaded.msg);
          throw new Error(pkgsLoaded.msg);
        }

        this.hasInitialized = true;
      }

      const appFileInfo = await getAppFile(appFileText, this.RProcess);
      if (appFileInfo === "EMPTY") {
        this.sendMessage?.({
          path: "TEMPLATE_CHOOSER",
          payload: "SINGLE-FILE",
        });
      } else {
        const { ui_bounds, ui_tree } = appFileInfo;

        this.uiBounds = ui_bounds;
        this.sendMessage?.({
          path: "UPDATED-TREE",
          payload: ui_tree,
        });
      }
    };

    const syncFileToClientStateDebounced = debounce(syncFileToClientState, 500);

    // Helper to check to make sure that a change event such as save or typing
    // is effecting the document we care about
    const isThisDocument = (doc: vscode.TextDocument): boolean => {
      return doc.uri.toString() === document.uri.toString();
    };

    // Hook up event handlers so that we can synchronize the webview with the text document.
    //
    // The text document acts as our model, so we have to sync change in the document to our
    // editor and sync changes in the editor back to the document.
    //
    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(
      (e) => {
        if (isThisDocument(e.document)) {
          syncFileToClientStateDebounced();
        }
      }
    );

    const saveDocumentSubscription = vscode.workspace.onDidSaveTextDocument(
      (savedDocument) => {
        if (isThisDocument(savedDocument)) {
          // Make sure to immediately fire any changes to sync on save so there's not a lag.
          syncFileToClientStateDebounced.flush();
        }
      }
    );

    // Make sure we get rid of the listener when our editor window is closed.
    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose();
      saveDocumentSubscription.dispose();
      console.log("Editor window closed", document.fileName);
    });

    const previewAppInfo = startPreviewApp({
      pathToApp: document.fileName,
      onInitiation: () => {
        this.sendMessage?.({
          path: "APP-PREVIEW-STATUS",
          payload: "LOADING",
        });
      },
      onReady: (url) => {
        this.sendMessage?.({
          path: "APP-PREVIEW-STATUS",
          payload: { url },
        });
      },
      onFailToStart: () => {
        this.sendMessage?.({
          path: "APP-PREVIEW-CRASH",
          payload: "Failed to start",
        });
      },
      onCrash: () => {
        this.sendMessage?.({
          path: "APP-PREVIEW-CRASH",
          payload: "Crashed",
        });
      },
      onLogs: (logs) => {
        this.sendMessage?.({
          path: "APP-PREVIEW-LOGS",
          payload: logs,
        });
      },
    });

    // Receive message from the webview.
    webviewPanel.webview.onDidReceiveMessage(async (msg) => {
      if (!this.sendMessage) {
        throw new Error(
          "Can't send message back to client, sendMessage not available."
        );
      }
      if (!this.RProcess) {
        throw new Error(
          "No available R Process available, somethings gone wrong."
        );
      }
      if (isMessageFromClient(msg)) {
        switch (msg.path) {
          case "READY-FOR-STATE":
            syncFileToClientState();
            // Let client know we're in vscode mode
            this.sendMessage?.({
              path: "RUNTIME-TYPE",
              payload: "VSCODE",
            });
            return;

          case "TEMPLATE-SELECTION": {
            const appFile = await generateAppTemplate(
              this.RProcess,
              msg.payload
            );

            await this.addUiTextToFile(appFile, document, "insert");
            return;
          }

          case "UPDATED-TREE": {
            if (!this.RProcess || !this.uiBounds) {
              throw new Error(
                "No available R Process or ui bounds, can't update UI tree"
              );
            }

            const { uiText } = await this.updateAppUI(document, msg.payload);
            latestAppWrite = uiText;
            return;
          }
          case "APP-PREVIEW-REQUEST": {
            previewAppInfo.start();
            return;
          }
          case "APP-PREVIEW-STOP": {
            previewAppInfo.stop();
            return;
          }
          case "APP-PREVIEW-RESTART": {
            previewAppInfo.start();
            return;
          }
          case "ENTERED-TEMPLATE-SELECTOR": {
            previewAppInfo.stop();
            this.clearAppFile(document);
            return;
          }
          case "OPEN-COMPANION-EDITOR": {
            if (
              codeCompanionEditor &&
              vscode.window.visibleTextEditors.includes(codeCompanionEditor)
            ) {
              // Avoid opening secondary companion editor
              return;
            }
            codeCompanionEditor = await this.openCodeCompanion(document);

            return;
          }
          default:
            console.warn("Unhandled message from client", msg);
        }
      } else {
        console.log("Unknown message from webview", msg);
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
			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root" style="height: 100vh; display: relative"></div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }

  private async addUiTextToFile(
    text: string,
    document: vscode.TextDocument,
    type: "insert" | "replace"
  ) {
    const uri = document.uri;
    const edit = new vscode.WorkspaceEdit();

    if (type === "replace") {
      const { start, end } = this.uiBounds || { start: 0, end: 0 };
      const uiRange = new vscode.Range(start - 1, 0, end, 0);
      edit.replace(uri, uiRange, text);
    }

    if (type === "insert") {
      edit.insert(document.uri, new vscode.Position(0, 0), text);
    }

    await vscode.workspace.applyEdit(edit);

    // Save so app preview will update
    document.save();
  }

  /**
   * Wipe app file clear
   */
  private async clearAppFile(document: vscode.TextDocument) {
    const uri = document.uri;
    const edit = new vscode.WorkspaceEdit();

    const uiRange = document.validateRange(
      new vscode.Range(0, 0, Infinity, Infinity)
    );

    edit.replace(uri, uiRange, "");

    await vscode.workspace.applyEdit(edit);

    // Save so app preview will update
    document.save();
  }
  /**
   * Write out new app ui into text document json to a given document.
   */
  private async updateAppUI(
    document: vscode.TextDocument,
    uiTree: ShinyUiNode
  ) {
    if (!this.RProcess) {
      throw new Error("Can't access R to build new ui code");
    }
    if (!this.uiBounds) {
      throw new Error("Attempting to update an app that has yet to be parsed.");
    }

    const { start, end } = this.uiBounds;

    const uiCode = await generateUpdatedUiCode(uiTree, this.RProcess);
    const newUiText = `ui <- ${collapseText(...uiCode.text)}\n`;
    await this.addUiTextToFile(newUiText, document, "replace");

    // Fix up ui bounds so next change will not mess up app
    const oldUiNumLines = end - start + 1;
    const newUiNumLines = uiCode.text.length;
    const uiNumLinesDiff = newUiNumLines - oldUiNumLines;
    this.uiBounds = {
      start,
      end: end + uiNumLinesDiff,
    };

    return { uiText: newUiText };
  }
}
