import produce from "immer";

import {
  ShinyUiNode,
  NodePath,
  shinyUiNodeInfo,
} from "../../Elements/uiNodeTypes";

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
function navigateToParent(
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

/**
 * Immutably remove a node from the UiTree.
 *
 * Note that this freezes the parent tree.
 */
export function removeNode({
  tree,
  path,
}: {
  tree: ShinyUiNode;
  path: NodePath;
}) {
  return produce(tree, (treeDraft) => {
    removeNodeMutating({
      tree: treeDraft,
      path,
    });
  });
}

export function removeNodeMutating({
  tree,
  path,
}: {
  tree: ShinyUiNode;
  path: NodePath;
}): void {
  const { parentNode, indexToNode } = navigateToParent(tree, path);

  // Splice out this child
  if (!checkIfContainerNode(parentNode)) {
    throw new Error("Somehow trying to enter a leaf node");
  }
  parentNode.uiChildren.splice(indexToNode, 1);
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
  tree: ShinyUiNode;
  path: NodePath;
  newNode: ShinyUiNode;
}) {
  return produce(tree, (treeDraft) => {
    const { parentNode, indexToNode } = navigateToParent(treeDraft, path);

    // Update requested child
    if (!checkIfContainerNode(parentNode)) {
      throw new Error("Somehow trying to enter a leaf node");
    }
    parentNode.uiChildren[indexToNode] = newNode;
  });
}

/**
 * Update the uiArguments and uiName of a node but leave the uiChildren alone
 */
export function updateNode({
  tree,
  path,
  newNode,
}: {
  tree: ShinyUiNode;
  path: NodePath;
  newNode: ShinyUiNode;
}) {
  return produce(tree, (treeDraft) => {
    const node = getNode(treeDraft, path);
    Object.assign(node, newNode);
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
  tree: ShinyUiNode;
  path: NodePath;
  newNode: ShinyUiNode;
}) {
  return produce(tree, (treeDraft) => {
    addNodeMutating({
      tree: treeDraft,
      path,
      newNode,
    });
  });
}

export function addNodeMutating({
  tree,
  path,
  newNode,
}: {
  tree: ShinyUiNode;
  path: NodePath;
  newNode: ShinyUiNode;
}): void {
  const parentNode = getNode(tree, path);
  if (!shinyUiNodeInfo[parentNode.uiName].acceptsChildren) {
    throw new Error(
      "Can't add a child to a non-container node. Check the path"
    );
  }

  // If this is the first child we may need to create the uiChildren array first
  if (!Array.isArray(parentNode.uiChildren)) {
    parentNode.uiChildren = [];
  }

  parentNode.uiChildren.push(newNode);
}
