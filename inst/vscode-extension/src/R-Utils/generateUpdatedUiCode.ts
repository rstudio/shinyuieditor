import type { ShinyUiNode } from "editor";

import { collapseText, escapeDoubleQuotes } from "../string-utils";

import type { ActiveRSession } from "./getRProcess";

export type UpdatedUiCode = {
  text: string[];
  namespaces_removed: string[];
};
export async function generateUpdatedUiCode(
  uiTree: ShinyUiNode,
  RProc: ActiveRSession
): Promise<UpdatedUiCode> {
  const rCommand = buildGeneratingCommand(uiTree);

  try {
    const generatedUiCode = await RProc.runCmd(rCommand, { verbose: false });

    return JSON.parse(collapseText(...generatedUiCode));
  } catch (e) {
    throw new Error("Failed to generate new ui code from tree");
  }
}

function buildGeneratingCommand(
  uiTree: ShinyUiNode,
  removeNamespace: boolean = true
) {
  const jsonifiedTree = escapeDoubleQuotes(JSON.stringify(uiTree, null, 2));

  const removeNamespaceArg = removeNamespace ? "TRUE" : "FALSE";
  return collapseText(
    `ui_tree <- jsonlite::fromJSON(`,
    `  txt = "${jsonifiedTree}",`,
    `  simplifyVector = FALSE`,
    `)`,
    `new_ui_code <- shinyuieditor:::ui_tree_to_code(ui_tree, remove_namespace = ${removeNamespaceArg})`,
    `new_ui_code$text <- as.character(new_ui_code$text)`,
    `jsonlite::toJSON(new_ui_code, auto_unbox = TRUE)`
  );
}
