import type { ShinyUiNode } from "editor";
import type * as vscode from "vscode";

import { addUiTextToFile } from "./addUiTextToFile";
import { generateUpdatedUiCode } from "./R-Utils/generateUpdatedUiCode";
import type { ParsedApp } from "./R-Utils/parseAppFile";
import type { ActiveRSession } from "./R-Utils/startBackgroundRProcess";
import { collapseText } from "./string-utils";

/**
 * Write out new app ui into text document json to a given document.
 */
export async function updateAppUI({
  document,
  uiBounds,
  RProcess,
  uiTree,
}: {
  document: vscode.TextDocument;
  uiTree: ShinyUiNode;
  uiBounds?: ParsedApp["ui_bounds"];
  RProcess: ActiveRSession;
}) {
  if (!uiBounds) {
    throw new Error("Attempting to update an app that has yet to be parsed.");
  }

  const { start, end } = uiBounds;

  const uiCode = await generateUpdatedUiCode(uiTree, RProcess);
  const newUiText = `ui <- ${collapseText(...uiCode.text)}\n`;
  await addUiTextToFile({
    text: newUiText,
    document,
    uiBounds,
    type: "replace",
  });

  // Fix up ui bounds so next change will not mess up app
  const oldUiNumLines = end - start + 1;
  const newUiNumLines = uiCode.text.length;
  const uiNumLinesDiff = newUiNumLines - oldUiNumLines;

  return {
    uiText: newUiText,
    uiBounds: {
      start,
      end: end + uiNumLinesDiff,
    },
  };
}