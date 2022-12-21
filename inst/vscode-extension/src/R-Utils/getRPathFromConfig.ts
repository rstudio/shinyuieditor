import * as vscode from "vscode";

export function getRPathFromConfig(): string | undefined {
  const platform =
    process.platform === "win32"
      ? "windows"
      : process.platform === "darwin"
      ? "mac"
      : "linux";

  const configEntry = `rpath.${platform}`;
  return vscode.workspace
    .getConfiguration("shinyuieditor")
    .get<string>(configEntry);
}
