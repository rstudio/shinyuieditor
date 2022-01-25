import produce from "immer";
import { NodePath, UiContainerNode, UiNodeProps } from "./index";

export function checkIfContainerNode(
  node: UiNodeProps
): node is UiContainerNode {
  return (node as UiContainerNode).uiChildren !== undefined;
}

/**
 * Navigate to a node in a UiTree at the provided path
 */
export function getNode(tree: UiNodeProps, path: NodePath): UiNodeProps {
  let currNode: UiNodeProps = tree;
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
function navigateToParent(
  tree: UiNodeProps,
  path: NodePath
): { parentNode: UiContainerNode; indexToNode: number } {
  const pathCopy = [...path];
  const indexToNode = pathCopy.pop();
  if (typeof indexToNode === "undefined")
    throw new Error("Path to node must have at least one element");

  const parentNode = getNode(tree, pathCopy);

  if (!checkIfContainerNode(parentNode)) {
    throw new Error("Somehow trying to enter a leaf node");
  }

  return { parentNode, indexToNode };
}

/**
 * Immutably remove a node from the UiTree.
 *
 * Note that this freezes the parent tree.
 */
export function removeNode({
  tree,
  path,
}: {
  tree: UiNodeProps;
  path: NodePath;
}) {
  return produce(tree, (treeDraft) => {
    const { parentNode, indexToNode } = navigateToParent(treeDraft, path);

    // Splice out this child
    parentNode.uiChildren.splice(indexToNode, 1);
  });
}

/**
 * Immutably replace a node in the UiTree with a new node
 *
 * Note that this freezes the parent tree.
 */
export function replaceNode({
  tree,
  path,
  newNode,
}: {
  tree: UiNodeProps;
  path: NodePath;
  newNode: UiNodeProps;
}) {
  return produce(tree, (treeDraft) => {
    const { parentNode, indexToNode } = navigateToParent(treeDraft, path);

    // Update requested child
    parentNode.uiChildren[indexToNode] = newNode;
  });
}

/**
 * Immutably add a node in a container node of the UiTree
 *
 * Note that this freezes the parent tree.
 */
export function addNode({
  tree,
  path,
  newNode,
}: {
  tree: UiNodeProps;
  path: NodePath;
  newNode: UiNodeProps;
}) {
  return produce(tree, (treeDraft) => {
    const parentNode = getNode(treeDraft, path);
    if (!checkIfContainerNode(parentNode)) {
      throw new Error(
        "Can't add a child to a non-container node. Check the path"
      );
    }

    // Add the new child
    parentNode.uiChildren.push(newNode);
  });
}
