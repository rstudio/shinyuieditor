import type { Language_Mode } from "ui-node-definitions/src/code_generation/Language_Mode";
import type * as vscode from "vscode";

type AppScriptStatus =
  | {
      status: "invalid";
      reason: string;
    }
  | {
      status: "empty" | "valid";
      lang: Language_Mode;
    };

function getLanguageMode(lang_id: string): Language_Mode | "OTHER" {
  if (lang_id === "python") return "PYTHON";
  if (lang_id === "r") return "R";
  return "OTHER";
}

export function appScriptStatus(
  document: vscode.TextDocument
): AppScriptStatus {
  const lang = getLanguageMode(document.languageId);

  if (lang === "OTHER")
    return {
      status: "invalid",
      reason: "The editor currently only supports R and Python.",
    };

  const scriptText = document.getText();

  if (scriptText.trim() === "") {
    return {
      status: "empty",
      lang,
    };
  }

  return lang === "R"
    ? checkIfValidRShinyScript(scriptText)
    : checkIfValidPyShinyScript(scriptText);
}

function checkIfValidRShinyScript(script: string): AppScriptStatus {
  if (RShinyAppCommandRegex.test(script)) {
    return { status: "valid", lang: "R" };
  }

  return {
    status: "invalid",
    reason:
      "Script doesn't appear to be a shiny app. Please start with a template or add a shinyApp() call.",
  };
}
const RShinyAppCommandRegex = /shinyApp\(/;

function checkIfValidPyShinyScript(script: string): AppScriptStatus {
  if (script.includes("from shiny")) {
    return { status: "valid", lang: "PYTHON" };
  }

  return {
    status: "invalid",
    reason:
      "Script doesn't appear to be a shiny app. Please start with a template or make sure you're importing shiny.",
  };
}
