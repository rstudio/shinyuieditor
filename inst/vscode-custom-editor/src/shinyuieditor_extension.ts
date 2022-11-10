import * as vscode from "vscode";
import {
  ActiveRSession,
  connectToRProcess,
  escapeDoubleQuotes,
} from "./connectToRProcess";
import { getRpath } from "./setupRConnection";
import { getNonce } from "./util";

// import { runSUE } from "../../ui-editor-react/src/runSUE";

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
  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new ShinyUiEditorProvider(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      ShinyUiEditorProvider.viewType,
      provider
    );
    return providerRegistration;
  }

  private RProcess: ActiveRSession | null = null;

  private static readonly viewType = "shinyUiEditor.appFile";

  constructor(private readonly context: vscode.ExtensionContext) {
    this.getR();
    console.log("extension constructor()");
  }

  private async getR() {
    const rPath = await getRpath();
    if (rPath === undefined) {
      throw new Error("Can't get R path");
    }
    const RProc = await connectToRProcess({ pathToR: rPath });
    this.RProcess = RProc;

    if (RProc === null) {
      console.error("R process failed to start :(");
      return;
    }

    const uglyCode = `  list(text=ui_def_text,
      namespaces_removed =ui_expression$namespaces_removed
    )`;

    console.log("Calling code formatter");
    const formattedCode = await this.formatRCode(uglyCode);

    // console.log("Formatted code", formattedCode);
    // console.log("quick mafs", await RProc.runCmd("4+9"));

    // console.log("Sequence", await RProc.runCmd("seq(1,20)"));
    // console.log("Quick Mafs", quickMaths);
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
    console.log("Editor window is opened!");
    // Setup initial content for the webview
    webviewPanel.webview.options = {
      enableScripts: true,
    };
    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

    this.getAppFile(document);

    function updateWebview() {
      webviewPanel.webview.postMessage({
        type: "update",
        text: document.getText(),
      });
    }

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
          updateWebview();
          console.log("New text file in view!");
        }
      }
    );

    // Make sure we get rid of the listener when our editor is closed.
    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose();
      this.RProcess?.stop();
    });

    // Receive message from the webview.
    webviewPanel.webview.onDidReceiveMessage((e) => {
      console.log("Message from webview", e);
    });

    updateWebview();
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

  private async formatRCode(unformattedCode: string) {
    if (!this.RProcess)
      throw new Error("No R Process available for running command");

    const formattedLines = await this.RProcess.runCmd(
      `styler::style_text("${unformattedCode}", scope = "tokens")`
    );

    return formattedLines.reduce((pasted, l) => pasted + "\n" + l, "");
  }

  private async getAppFile(document: vscode.TextDocument) {
    if (!this.RProcess) return;

    const text = escapeDoubleQuotes(document.getText());

    const formatCommand = `
app_lines <- strsplit("${text}", "\\n")[[1]]
jsonlite::toJSON(
  shinyuieditor:::get_file_ui_definition_info(app_lines, "single-file"),
  auto_unbox = TRUE
)`;
    const formatedOutput = await this.RProcess.runCmd(formatCommand);

    // try {
    //   console.log(
    //     "Parsed app info",
    //     JSON.parse(formatedOutput.reduce((all, l) => all + "\n" + l, ""))
    //   );
    // } catch {
    //   throw new Error(
    //     "Could not get document as json. Content is not valid json"
    //   );
    // }
  }

  /**
   * Try to get a current document as json text.
   */
  private getDocumentAsJson(document: vscode.TextDocument): any {
    const text = document.getText();
    if (text.trim().length === 0) {
      return {};
    }

    try {
      return JSON.parse(text);
    } catch {
      throw new Error(
        "Could not get document as json. Content is not valid json"
      );
    }
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