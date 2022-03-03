import produce from "immer";
import { addAtIndex } from "utils/array-helpers";

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
   * Where in the children should the node be placed? An integer can be used to
   * specify the position exactly, or "last" can be provided if the node should
   * just be added as the last child without needing to know the number of
   * existing children.
   */
  positionInChildren?: number | "last";
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
export function addNode({
  tree,
  parentPath,
  newNode,
  positionInChildren = "last",
}: AddNodeArguments) {
  return produce(tree, (treeDraft) => {
    addNodeMutating({
      tree: treeDraft,
      parentPath: parentPath,
      newNode,
      positionInChildren,
    });
  });
}

export function addNodeMutating({
  tree,
  parentPath,
  newNode,
  positionInChildren,
}: Required<AddNodeArguments>): void {
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

  const exactlyPositioned = typeof positionInChildren === "number";

  if (exactlyPositioned) {
    parentNode.uiChildren = addAtIndex(
      parentNode.uiChildren,
      positionInChildren,
      newNode
    );
  }

  if (positionInChildren === "last") {
    parentNode.uiChildren.push(newNode);
  }
}
