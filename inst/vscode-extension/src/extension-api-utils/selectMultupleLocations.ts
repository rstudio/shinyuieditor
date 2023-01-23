import * as vscode from "vscode";

/**
 * Type-safe wrapping of the `goToLocations` vscode editor action command.
 * Interface found here
 * https://code.visualstudio.com/api/references/commands#:~:text=editor.action.goToLocations
 * @param args
 */
export async function selectMultupleLocations({
  uri,
  position = new vscode.Position(0, 0),
  locations,
  multiple = "gotoAndPeek",
  noResultsMessage,
}: {
  /** The text document in which to start */
  uri: vscode.Uri;
  /** The position at which to start */
  position?: vscode.Position;
  /** An array of locations */
  locations: vscode.Location[];
  /** Define what to do when having multiple results, either `peek`,
   * `gotoAndPeek`, or `goto` */
  multiple?: "peek" | "gotoAndPeek" | "goto";
  /** Human readable message that shows when locations is empty */
  noResultsMessage: string;
}) {
  await vscode.commands.executeCommand(
    "editor.action.goToLocations",
    uri,
    position,
    locations,
    multiple,
    noResultsMessage
  );
}
