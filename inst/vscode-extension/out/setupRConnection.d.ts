import * as vscode from "vscode";
export declare function config(): vscode.WorkspaceConfiguration;
export declare function getRpathFromSystem(): Promise<string>;
export declare function getRPathConfigEntry(term?: boolean): string;
export declare function getRpath(quote?: boolean, overwriteConfig?: string): Promise<string | undefined>;
//# sourceMappingURL=setupRConnection.d.ts.map