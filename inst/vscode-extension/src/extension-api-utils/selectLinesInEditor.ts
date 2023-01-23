import type * as vscode from "vscode";

import type { App_Location } from "../editorLogic";

import { uiBoundsToSelection } from "./uiBoundsToSelection";

/**
 * Select a given range of lines of a document
 *
 * @param selection start and end lines of selection to make
 * @param editor `vscode.TextEditor` object
 */
export function selectLinesInEditor(
  selection: App_Location,
  editor: vscode.TextEditor
) {
  editor.selection = uiBoundsToSelection(selection);
}
