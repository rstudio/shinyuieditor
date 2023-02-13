import type { R_Ui_Code } from "communication-types/src/MessageToBackend";
import type * as vscode from "vscode";

import { addUiTextToFile } from "./addUiTextToFile";
import type { App_Location } from "./editorLogic";

/**
 * Write out new app ui into text document json to a given document.
 */
export async function updateAppUI({
  document,
  uiBounds,
  ui_info,
}: {
  document: vscode.TextDocument;
  ui_info: R_Ui_Code;
  uiBounds?: App_Location;
}) {
  if (!uiBounds) {
    throw new Error("Attempting to update an app that has yet to be parsed.");
  }

  const { ui_code } = ui_info;

  const { start_row, start_col, end_row, end_col } = uiBounds;

  const newUiText = `ui <- ${ui_code}\n`;
  await addUiTextToFile({
    text: newUiText,
    document,
    uiBounds,
    type: "replace",
  });

  // Fix up ui bounds so next change will not mess up app
  const oldUiNumLines = end_row - start_row + 1;
  const newUiNumLines = ui_code.split("\n").length;
  const uiNumLinesDiff = newUiNumLines - oldUiNumLines;

  return {
    uiText: newUiText,
    uiBounds: {
      start_row,
      start_col,
      end_row: end_row + uiNumLinesDiff,
      end_col,
    },
  };
}
