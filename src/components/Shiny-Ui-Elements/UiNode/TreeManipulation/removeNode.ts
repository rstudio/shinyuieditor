import produce from "immer";

import { ShinyUiNode, NodePath } from "../../Elements/uiNodeTypes";

import { navigateToParent, checkIfContainerNode } from "./treeManipulation";

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
  const { parentNode, indexToNode } = navigateToParent(tree, path);

  // Splice out this child
  if (!checkIfContainerNode(parentNode)) {
    throw new Error("Somehow trying to enter a leaf node");
  }
  parentNode.uiChildren.splice(indexToNode, 1);
}
