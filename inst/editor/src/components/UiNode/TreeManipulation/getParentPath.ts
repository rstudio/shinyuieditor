import type { NodePath } from "../../../Shiny-Ui-Elements/uiNodeTypes";

export function getParentPath(path: NodePath): NodePath {
  return path.slice(0, path.length - 1);
}

/**
 * Get the index of node in parent's children array. Aka the last element of
 * their path
 * @param path Path to node
 * @returns Index corresponding to node's position in it's parents children
 * array
 */
export function getChildIndex(path: NodePath): number {
  return path[path.length - 1];
}
