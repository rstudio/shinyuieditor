import { sameArray } from "util-functions/src/equalityCheckers";

import type { NodePath } from "../../../Shiny-Ui-Elements/uiNodeTypes";

/**
 * Are nodes A and B siblings of eachother? A node is _not_ its own sibling.
 * @param aPath Path to node A
 * @param bPath Path to node B
 */
export function nodesAreSiblings(aPath: NodePath, bPath: NodePath): boolean {
  return (
    nodesShareImmediateParent(aPath, bPath) && aPath.at(-1) !== bPath.at(-1)
  );
}

/**
 * Are is the parent of node A and node B the same node?
 * @param aPath Path to node A
 * @param bPath Path to node B
 */
export function nodesShareImmediateParent(
  aPath: NodePath,
  bPath: NodePath
): boolean {
  const aDepth = aPath.length;
  const bDepth = bPath.length;

  // If depth is not the same then they can't share a common parent
  if (aDepth !== bDepth) return false;

  const parentDepth = aDepth - 1;

  // If the path up to the depth of b is the same, then we have a child
  return sameArray(aPath.slice(0, parentDepth), bPath.slice(0, parentDepth));
}
