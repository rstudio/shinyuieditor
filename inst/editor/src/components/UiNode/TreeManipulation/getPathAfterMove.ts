import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";

import { nodeDepth } from "./nodeDepth";

/**
 * Node movement arguments
 */
type NodeMoveArgs = {
  /**
   * Node path of path the node is moving from
   */
  fromPath: NodePath;
  /**
   * Node Path of where the node is moving to
   */
  toPath: NodePath;
};

/**
 *
 * @param moveArgs Info about the move paths
 * @returns New nodepath that represents the position just-moved node after the move
 */
export function getPathAfterMove({ fromPath, toPath }: NodeMoveArgs): NodePath {
  // Find index of common depth between current and new paths
  const fromDepth = nodeDepth(fromPath);
  const toDepth = nodeDepth(toPath);

  // If the new path is "later" in the children then that index will need to
  // be incremented down to account for the change in tree structure of moving
  // the node
  if (toDepth < fromDepth) return toPath;

  const indexOfChange = fromDepth - 1;

  if (fromPath[indexOfChange] > toPath[indexOfChange]) {
    return toPath;
  }

  // If the new path is in a later child than the from path (which is now gone)
  // we will need to decrement the path index at that depth down one
  const updatedPath = [...toPath];
  updatedPath[indexOfChange]--;

  return updatedPath;
}
