import type { NodePath } from "../NodePath";

import { pathsSameAtDepth } from "./pathsSameAtDepth";

/**
 * Is the parent of the shortest path contained in the longer path?
 * @param aPath Path to node A
 * @param bPath Path to node B
 */
export function nodesShareCommonParent(
  aPath: NodePath,
  bPath: NodePath
): boolean {
  const compareDepth = Math.min(aPath.length, bPath.length) - 1;

  if (compareDepth <= 0) return true;
  return pathsSameAtDepth(aPath, bPath, compareDepth);
}
