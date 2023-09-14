/**
 * Is the parent of the shortest path contained in the longer path?
 * @param aPath Path to node A
 * @param bPath Path to node B
 */

import { sameArray } from "util-functions/src/equalityCheckers";

import type { NodePath } from "../NodePath";

export function pathsSameAtDepth(
  aPath: NodePath,
  bPath: NodePath,
  depth: number
): boolean {
  if (depth === 0) return true;
  return sameArray(aPath.slice(0, depth), bPath.slice(0, depth));
}
