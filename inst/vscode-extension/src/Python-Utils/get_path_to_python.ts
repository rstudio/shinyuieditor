import * as vscode from "vscode";

/**
 * Use the Python extension to get the path to the current Python interpreter
 * @returns The path to the current Python interpreter
 * @throws If the Python extension is not installed
 */
export async function getPathToPython(): Promise<string> {
  // Get the Python extension api
  const pythonAPI = vscode.extensions.getExtension("ms-python.python");

  if (!pythonAPI) {
    throw new Error("Python extension needed for previewing Python apps");
  }

  const execution_details =
    await pythonAPI.exports.environment.getExecutionDetails(
      vscode.window.activeTextEditor?.document.uri
    );

  return execution_details.execCommand.join(" ");
}
