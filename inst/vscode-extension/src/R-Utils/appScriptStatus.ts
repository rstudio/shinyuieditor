import type * as vscode from "vscode";

export function appScriptStatus(
  document: vscode.TextDocument
): "valid" | "empty" | "invalid" {
  const scriptText = document.getText();

  if (scriptText.trim() === "") return "empty";

  if (shinyAppCommandRegex.test(scriptText)) return "valid";

  // There is something in the script and it's not empty space or a shiny app
  return "invalid";
}
const shinyAppCommandRegex = /shinyApp\(/;
