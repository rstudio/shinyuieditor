import type { ShinyUiNode } from "../main";

export function isShinyUiNode(x: unknown): x is ShinyUiNode {
  return (
    "uiName" != null && x != null && typeof x === "object" && "uiName" in x
  );
}
