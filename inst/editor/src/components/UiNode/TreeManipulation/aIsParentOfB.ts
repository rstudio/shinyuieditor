import type { NodePath } from "ui-node-definitions/src/NodePath";

import { nodeDepth } from "./nodeDepth";
import { pathsSameAtDepth } from "./pathsSameAtDepth";

/**
 * Is node A the parent, grandparent, great-grand parent,... of B?
 * @param aPath Path to node A
 * @param bPath Path to node B
 */
export function aIsParentOfB(aPath: NodePath, bPath: NodePath) {
  const aDepth = nodeDepth(aPath);
  const bDepth = nodeDepth(bPath);

  // If a is lowed up the tree or equal to b then it can't be descended
  if (aDepth >= bDepth) return false;

  return pathsSameAtDepth(aPath, bPath, aDepth);
}
