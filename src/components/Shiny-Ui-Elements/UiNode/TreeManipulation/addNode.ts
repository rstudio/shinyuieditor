import produce from "immer";

import {
  ShinyUiNode,
  NodePath,
  shinyUiNodeInfo,
} from "../../Elements/uiNodeTypes";

import { getNode } from "./treeManipulation";

/**
 * Arguments to add a new node to a Shiny Ui Node tree
 */
type AddNodeArguments = {
  /**
   * UiNode tree that node will be placed in
   */
  tree: ShinyUiNode;
  /**
   * Path to the parent the node will be placed within
   */
  parentPath: NodePath;
  /**
   * Node to be added
   */
  newNode: ShinyUiNode;
};

/**
 * Immutably add a node in a container node of the UiTree
 *
 * Note that this freezes the parent tree.
 */
export function addNode({ tree, parentPath, newNode }: AddNodeArguments) {
  return produce(tree, (treeDraft) => {
    addNodeMutating({
      tree: treeDraft,
      parentPath: parentPath,
      newNode,
    });
  });
}

export function addNodeMutating({
  tree,
  parentPath,
  newNode,
}: AddNodeArguments): void {
  const parentNode = getNode(tree, parentPath);
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
