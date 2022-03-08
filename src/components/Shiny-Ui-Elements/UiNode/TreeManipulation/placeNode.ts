import produce from "immer";
import { addAtIndex, moveElement } from "utils/array-helpers";
import { sameArray } from "utils/equalityCheckers";

import type {
  ShinyUiNode,
  NodePath} from "../../Elements/uiNodeTypes";
import {
  shinyUiNodeInfo,
} from "../../Elements/uiNodeTypes";

import { getNode } from "./getNode";
import { removeNodeMutating } from "./removeNode";

/**
 * Arguments to add a new node to a Shiny Ui Node tree
 */
export type PlaceNodeArguments = {
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
export function placeNode(
  tree: ShinyUiNode,
  placeArguments: PlaceNodeArguments
) {
  return produce(tree, (treeDraft) => {
    placeNodeMutating(treeDraft, placeArguments);
  });
}

export function placeNodeMutating(
  tree: ShinyUiNode,
  {
    parentPath,
    node,
    positionInChildren = "last",
    currentPath,
  }: PlaceNodeArguments
): void {
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

  const nextIndex =
    positionInChildren === "last"
      ? parentNode.uiChildren.length
      : positionInChildren;

  // If there's a current path for the node, then this is a move rather than a
  // pure add of a node
  if (currentPath !== undefined) {
    const nextPath = [...parentPath, nextIndex];

    if (nodesAreDirectAncestors(currentPath, nextPath)) {
      throw new Error("Invalid move request");
    }

    // A special case of moving is reordering a node within the children.
    if (nodesAreSiblings(currentPath, nextPath)) {
      const previousIndex = currentPath[currentPath.length - 1];

      parentNode.uiChildren = moveElement(
        parentNode.uiChildren,
        previousIndex,
        nextIndex
      );

      // We're done now so return early
      return;
    }

    // If this is a move then we need to remove the node from the previous position
    removeNodeMutating(tree, { path: currentPath });
  }

  parentNode.uiChildren = addAtIndex(parentNode.uiChildren, nextIndex, node);
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

/**
 * Are nodes A and B siblings of eachother?
 * @param aPath Path to node A
 * @param bPath Path to node B
 */
export function nodesAreSiblings(aPath: NodePath, bPath: NodePath): boolean {
  const aDepth = aPath.length;
  const bDepth = bPath.length;

  // Siblings have to be at the same depth in the tree
  if (aDepth !== bDepth) return false;

  const parentDepth = aDepth - 1;

  // If the path up to the depth of b is the same, then we have a child
  return sameArray(aPath.slice(0, parentDepth), bPath.slice(0, parentDepth));
}

export function getIsValidMove({
  fromPath,
  toPath,
}: {
  fromPath: NodePath;
  toPath: NodePath;
}): boolean {
  if (nodesAreDirectAncestors(fromPath, toPath)) return false;

  if (nodesAreSiblings(fromPath, toPath)) {
    // A move of a node to its own position or the one immediately following are
    // effectivly 'no ops' so we count them as invalid
    const depth = fromPath.length;
    const fromIndex = fromPath[depth - 1];
    const toIndex = toPath[depth - 1];
    if (fromIndex === toIndex || fromIndex === toIndex - 1) return false;
  }

  return true;
}
