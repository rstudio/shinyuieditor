import * as vscode from "vscode";
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
export declare class ShinyUiEditorProvider implements vscode.CustomTextEditorProvider {
    private readonly context;
    private sendMessage;
    static register(context: vscode.ExtensionContext): vscode.Disposable;
    private RProcess;
    private static readonly viewType;
    constructor(context: vscode.ExtensionContext);
    private getR;
    /**
     * Called when our custom editor is opened.
     *
     *
     */
    resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel, _token: vscode.CancellationToken): Promise<void>;
    /**
     * Get the static html used for the editor webviews.
     */
    private getHtmlForWebview;
    private formatRCode;
    private getAppFile;
    /**
     * Try to get a current document as json text.
     */
    private getDocumentAsJson;
    /**
     * Write out the json to a given document.
     */
    private updateTextDocument;
}
//# sourceMappingURL=shinyuieditor_extension.d.ts.map