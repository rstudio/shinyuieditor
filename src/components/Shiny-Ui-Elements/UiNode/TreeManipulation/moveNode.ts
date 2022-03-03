import {
  NodePath,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import produce from "immer";
import { sameArray } from "utils/equalityCheckers";

import { addNodeMutating } from "./addNode";
import { getNode, removeNodeMutating } from "./treeManipulation";

export default function moveNode({
  tree,
  fromPath,
  toPath,
  positionInChildren = "last",
}: {
  tree: ShinyUiNode;
  fromPath: NodePath;
  toPath: NodePath;
  positionInChildren?: number | "last";
}) {
  // Sanity checks before performing move
  if (invalidMove({ fromPath, toPath })) {
    throw new Error("Invalid move request");
  }
  return produce(tree, (treeDraft) => {
    // Gather node first
    const nodeToMove = getNode(treeDraft, fromPath);

    // Add it to the new position
    addNodeMutating({
      tree: treeDraft,
      parentPath: toPath,
      newNode: nodeToMove,
      positionInChildren,
    });

    // Remove it from its previous position
    removeNodeMutating({ tree: treeDraft, path: fromPath });
  });
}

export function invalidMove({
  fromPath,
  toPath,
}: {
  fromPath: NodePath;
  toPath: NodePath;
}): boolean {
  // Can't make an item its own child
  if (nodesAreDirectAncestors(toPath, fromPath)) return true;

  return false;
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
