import produce from "immer";
import { addAtIndex } from "utils/array-helpers";
import { sameArray } from "utils/equalityCheckers";

import {
  ShinyUiNode,
  NodePath,
  shinyUiNodeInfo,
} from "../../Elements/uiNodeTypes";

import { getNode, removeNodeMutating } from "./treeManipulation";

/**
 * Arguments to add a new node to a Shiny Ui Node tree
 */
type PlaceNodeArguments = {
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
  node: ShinyUiNode;
  /**
   * The full current path of the node, if it is being moved and added
   */
  currentPath?: NodePath;
};

/**
 * Immutably add/move a node in a container node of the UiTree
 *
 * Note that this freezes the parent tree.
 */
export function placeNode({
  tree,
  parentPath,
  node,
  positionInChildren = "last",
  currentPath,
}: PlaceNodeArguments) {
  return produce(tree, (treeDraft) => {
    addNodeMutating({
      tree: treeDraft,
      parentPath: parentPath,
      node: node,
      positionInChildren,
      currentPath,
    });
  });
}

export function addNodeMutating({
  tree,
  parentPath,
  node,
  positionInChildren,
  currentPath,
}: PlaceNodeArguments): void {
  const isMove = currentPath !== undefined;

  if (isMove && nodesAreDirectAncestors(currentPath, parentPath)) {
    throw new Error("Invalid move request");
  }

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
      node
    );
  }

  if (positionInChildren === "last") {
    parentNode.uiChildren.push(node);
  }

  // If this is a move then we need to remove the node from the previous position
  if (currentPath !== undefined) {
    removeNodeMutating({ tree, path: currentPath });
  }
}

/**
 * Are nodes A and B direct ancestors of eachother (parent, grandparent, etc...)?
 * @param aPath Path to node A
 * @param bPath Path to node B
 */
export function nodesAreDirectAncestors(
  aPath: NodePath,
  bPath: NodePath
): boolean {
  const aDepth = aPath.length;
  const bDepth = bPath.length;

  const compareDepth = Math.min(aDepth, bDepth);

  // If the path up to the depth of b is the same, then we have a child
  return sameArray(aPath.slice(0, compareDepth), bPath.slice(0, compareDepth));
}
