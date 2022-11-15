import type * as vscode from "vscode";
export declare function disposeAll(disposables: vscode.Disposable[]): void;
export declare abstract class Disposable {
    private _isDisposed;
    protected _disposables: vscode.Disposable[];
    dispose(): any;
    protected _register<T extends vscode.Disposable>(value: T): T;
    protected get isDisposed(): boolean;
}
//# sourceMappingURL=dispose.d.ts.map