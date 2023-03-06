/**
 * Are two node paths the same?
 * @param aPath Path to node A
 * @param bPath Path to node B
 */

import { sameArray } from "util-functions/src/equalityCheckers";

import type { NodePath } from "../../../Shiny-Ui-Elements/uiNodeTypes";

export function samePath(
  aPath: NodePath | undefined | null,
  bPath?: NodePath | undefined | null
): boolean {
  if (!aPath || !bPath) return false;
  return sameArray(aPath, bPath);
}
