import {
  UiNodeProps,
  NodePath,
  isContainerNode,
  UiContainerNode,
} from "./index";
import getNode from "./getNode";

export function navigateToParent(
  tree: UiNodeProps,
  path: NodePath
): { parentNode: UiContainerNode; indexToNode: number } {
  const pathCopy = [...path];
  const indexToNode = pathCopy.pop();
  if (typeof indexToNode === "undefined")
    throw new Error("Path to node must have at least one element");

  const parentNode = getNode(tree, pathCopy);

  if (!isContainerNode(parentNode)) {
    throw new Error("Somehow trying to enter a leaf node");
  }

  return { parentNode, indexToNode };
}
