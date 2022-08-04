import type { NodePath } from "components/Shiny-Ui-Elements/uiNodeTypes";

import { pathsSameAtDepth } from "./pathsSameAtDepth";

/**
 * Are nodes A and B direct ancestors of eachother (parent, grandparent, etc...)?
 * @param aPath Path to node A
 * @param bPath Path to node B
 */

export function nodesAreDirectAncestors(
  aPath: NodePath,
  bPath: NodePath
): boolean {
  return pathsSameAtDepth(aPath, bPath, Math.min(aPath.length, bPath.length));
}
