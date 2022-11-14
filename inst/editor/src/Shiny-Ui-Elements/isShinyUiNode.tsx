import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

export function isShinyUiNode(x: unknown): x is ShinyUiNode {
  return (
    "uiName" != null && x != null && typeof x === "object" && "uiName" in x
  );
}
