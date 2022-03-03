import { ShinyUiNode, NodePath } from "../../Elements/uiNodeTypes";

/**
 * Like Required but you can choose what subset of properties are required
 */
type RequireProp<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};
type UiContainerNode = RequireProp<ShinyUiNode, "uiChildren">;

export function checkIfContainerNode(
  node: ShinyUiNode
): node is UiContainerNode {
  return (node as UiContainerNode).uiChildren !== undefined;
}

/**
 * Navigate to a node in a UiTree at the provided path
 */
export function getNode(tree: ShinyUiNode, path: NodePath): ShinyUiNode {
  let currNode: ShinyUiNode = tree;
  let currPath: number;
  for (currPath of path) {
    if (!checkIfContainerNode(currNode)) {
      throw new Error("Somehow trying to enter a leaf node");
    }

    currNode = currNode.uiChildren[currPath];
  }

  return currNode;
}

/**
 * Get the containing node of another node by its path. Also returns the final
 * index to get to the node so it can be easily modified
 */
export function navigateToParent(
  tree: ShinyUiNode,
  path: NodePath
): { parentNode: ShinyUiNode; indexToNode: number } {
  const pathCopy = [...path];
  const indexToNode = pathCopy.pop();
  if (typeof indexToNode === "undefined")
    throw new Error("Path to node must have at least one element");

  // If we're only going one level deep, then we just need to return the tree
  // itself to get to the "parent"
  const parentNode = pathCopy.length === 0 ? tree : getNode(tree, pathCopy);

  if (!checkIfContainerNode(parentNode)) {
    throw new Error("Somehow trying to enter a leaf node");
  }

  return { parentNode, indexToNode };
}
