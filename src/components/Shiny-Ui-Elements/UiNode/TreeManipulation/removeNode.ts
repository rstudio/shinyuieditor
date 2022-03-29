import produce from "immer";

import type {
  NodePath,
  ShinyUiNode,
  UiComponentInfo,
} from "../../Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "../../Elements/uiNodeTypes";

import { checkIfContainerNode } from "./checkIfContainerNode";
import { getNode } from "./getNode";

/**
 * Arguments to remove node from the Shiny Ui Node tree
 */
export type RemoveNodeArguments = {
  /**
   * The full current path of the node, if it is being moved and added
   */
  path: NodePath;
};

/**
 * Immutably remove a node from the UiTree.
 *
 * Note that this freezes the parent tree.
 */
export function removeNode(tree: ShinyUiNode, removeArgs: RemoveNodeArguments) {
  return produce(tree, (treeDraft) => {
    removeNodeMutating(treeDraft, removeArgs);
  });
}

export function removeNodeMutating(
  tree: ShinyUiNode,
  { path }: RemoveNodeArguments
): void {
  for (let info of Object.values(shinyUiNodeInfo)) {
    const nodeUpdateSubscriber = info?.stateUpdateSubscribers?.DELETE_NODE;
    if (nodeUpdateSubscriber) {
      nodeUpdateSubscriber(tree, { path });
    }
  }

  const { parentNode, indexToNode } = navigateToParent(tree, path);

  // Splice out this child
  if (!checkIfContainerNode(parentNode)) {
    throw new Error("Somehow trying to enter a leaf node");
  }
  parentNode.uiChildren.splice(indexToNode, 1);
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
