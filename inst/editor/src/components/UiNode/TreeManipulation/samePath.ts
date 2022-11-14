import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";
import { sameArray } from "utils/equalityCheckers";

/**
 * Are two node paths the same?
 * @param aPath Path to node A
 * @param bPath Path to node B
 */

export function samePath(
  aPath: NodePath | undefined | null,
  bPath?: NodePath | undefined | null
): boolean {
  if (!aPath || !bPath) return false;
  return sameArray(aPath, bPath);
}
