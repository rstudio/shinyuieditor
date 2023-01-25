import type * as vscode from "vscode";

import type { ParsedApp } from "../R-Utils/parseAppFile";

import { uiBoundsToSelection } from "./uiBoundsToSelection";

/**
 * Select a given range of lines of a document
 *
 * @param selection start and end lines of selection to make
 * @param editor `vscode.TextEditor` object
 */
export function selectLinesInEditor(
  selection: ParsedApp["ui_bounds"],
  editor: vscode.TextEditor
) {
  editor.selection = uiBoundsToSelection(selection);
}
