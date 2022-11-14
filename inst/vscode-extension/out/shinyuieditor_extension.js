"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShinyUiEditorProvider = void 0;
const vscode = __importStar(require("vscode"));
const connectToRProcess_1 = require("./connectToRProcess");
const setupRConnection_1 = require("./setupRConnection");
const util_1 = require("./util");
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
class ShinyUiEditorProvider {
    constructor(context) {
        this.context = context;
        this.sendMessage = null;
        this.RProcess = null;
        this.getR();
        console.log("extension constructor()");
    }
    static register(context) {
        const provider = new ShinyUiEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(ShinyUiEditorProvider.viewType, provider);
        return providerRegistration;
    }
    async getR() {
        const rPath = await (0, setupRConnection_1.getRpath)();
        if (rPath === undefined) {
            throw new Error("Can't get R path");
        }
        const RProc = await (0, connectToRProcess_1.connectToRProcess)({ pathToR: rPath });
        this.RProcess = RProc;
        if (RProc === null) {
            console.error("R process failed to start :(");
            return;
        }
        // const uglyCode = `  list(text=ui_def_text,
        //   namespaces_removed =ui_expression$namespaces_removed
        // )`;
        // console.log("Calling code formatter");
        // const formattedCode = await this.formatRCode(uglyCode);
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
    async resolveCustomTextEditor(document, webviewPanel, _token) {
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
        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument((e) => {
            if (e.document.uri.toString() === document.uri.toString()) {
                updateWebview();
                console.log("New text file in view!");
            }
        });
        // Make sure we get rid of the listener when our editor is closed.
        webviewPanel.onDidDispose(() => {
            changeDocumentSubscription.dispose();
            this.RProcess?.stop();
        });
        // Receive message from the webview.
        webviewPanel.webview.onDidReceiveMessage((e) => {
            console.log("Message from webview", e);
        });
        this.sendMessage = (msg) => webviewPanel.webview.postMessage(msg);
        updateWebview();
    }
    /**
     * Get the static html used for the editor webviews.
     */
    getHtmlForWebview(webview) {
        // Local path to script and css for the webview
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, "media", "build", "bundle.js"));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, "media", "build", "bundle.css"));
        // Use a nonce to whitelist which scripts can be run
        const nonce = (0, util_1.getNonce)();
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
    async formatRCode(unformattedCode) {
        if (!this.RProcess)
            throw new Error("No R Process available for running command");
        const formattedLines = await this.RProcess.runCmd(`styler::style_text("${unformattedCode}", scope = "tokens")`);
        return formattedLines.reduce((pasted, l) => pasted + "\n" + l, "");
    }
    async getAppFile(document) {
        if (!this.RProcess)
            return;
        const text = (0, connectToRProcess_1.escapeDoubleQuotes)(document.getText());
        const parseCommand = `
app_lines <- strsplit("${text}", "\\n")[[1]]
jsonlite::toJSON(
  shinyuieditor:::get_file_ui_definition_info(app_lines, "single-file"),
  auto_unbox = TRUE
)`;
        const parsedCommandOutput = await this.RProcess.runCmd(parseCommand);
        try {
            const parsedAppInfo = JSON.parse(parsedCommandOutput.reduce((all, l) => all + "\n" + l, ""));
            this.sendMessage?.({
                path: "UPDATED-TREE",
                payload: parsedAppInfo.ui_tree,
            });
        }
        catch {
            throw new Error("Could not get document as json. Content is not valid json");
        }
    }
    /**
     * Try to get a current document as json text.
     */
    getDocumentAsJson(document) {
        const text = document.getText();
        if (text.trim().length === 0) {
            return {};
        }
        try {
            return JSON.parse(text);
        }
        catch {
            throw new Error("Could not get document as json. Content is not valid json");
        }
    }
    /**
     * Write out the json to a given document.
     */
    updateTextDocument(document, json) {
        const edit = new vscode.WorkspaceEdit();
        // Just replace the entire document every time for this example extension.
        // A more complete extension should compute minimal edits instead.
        edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), JSON.stringify(json, null, 2));
        return vscode.workspace.applyEdit(edit);
    }
}
exports.ShinyUiEditorProvider = ShinyUiEditorProvider;
ShinyUiEditorProvider.viewType = "shinyUiEditor.appFile";
//# sourceMappingURL=shinyuieditor_extension.js.map