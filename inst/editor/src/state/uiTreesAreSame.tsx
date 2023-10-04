import compare from "just-compare";

import type { ShinyUiNode } from "../ui-node-definitions/ShinyUiNode";

/**
 * Check if two UI trees are different. Useful to avoid duplicating work/ state
 * saves etc.
 * @param treeA
 * @param treeB
 * @returns
 */
export function uiTreesAreSame(treeA: ShinyUiNode, treeB: ShinyUiNode) {
  // TODO: Make this more efficient.
  return compare(treeA, treeB);
}
