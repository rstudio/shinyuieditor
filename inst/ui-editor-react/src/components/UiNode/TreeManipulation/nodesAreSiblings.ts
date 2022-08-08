import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";
import { sameArray } from "utils/equalityCheckers";

/**
 * Are nodes A and B siblings of eachother?
 * @param aPath Path to node A
 * @param bPath Path to node B
 */

export function nodesAreSiblings(aPath: NodePath, bPath: NodePath): boolean {
  const aDepth = aPath.length;
  const bDepth = bPath.length;

  // Siblings have to be at the same depth in the tree
  if (aDepth !== bDepth) return false;

  const parentDepth = aDepth - 1;

  // If the path up to the depth of b is the same, then we have a child
  const haveSameParent = sameArray(
    aPath.slice(0, parentDepth),
    bPath.slice(0, parentDepth)
  );

  if (!haveSameParent) return false;

  // A node is not its own sibling
  return aPath.slice(-1)[0] !== bPath.slice(-1)[0];
}
