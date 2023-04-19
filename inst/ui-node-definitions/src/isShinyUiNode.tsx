import type { ShinyUiNode } from "../main";

export function isShinyUiNode(x: unknown): x is ShinyUiNode {
  return "id" != null && x != null && typeof x === "object" && "id" in x;
}
