import produce from "immer";
import type { ShinyUiNode, NodePath } from "Shiny-Ui-Elements/uiNodeTypes";

import type { AddNodeArguments } from "./addNodeMutating";
import { addNodeMutating } from "./addNodeMutating";
import type { MoveNodeArguments } from "./moveNodeMutating";
import { moveNodeMutating } from "./moveNodeMutating";
import { nodesAreDirectAncestors } from "./nodesAreDirectAncestors";
import { nodesAreSiblings } from "./nodesAreSiblings";

/**
 * Arguments to add a new node to a Shiny Ui Node tree
 */
export type PlaceNodeArguments = MoveNodeArguments | AddNodeArguments;

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
  args: PlaceNodeArguments
): void {
  const { path } = args;

  if ("currentPath" in args && args.currentPath) {
    moveNodeMutating(tree, { path, currentPath: args.currentPath });
    return;
  }

  if ("node" in args && args.node) {
    addNodeMutating(tree, { path, node: args.node });
    return;
  }

  throw new Error("Either need a node or a current path for place action");
}

export function getIsValidMove({
  fromPath,
  toPath,
}: {
  fromPath: NodePath | undefined | null;
  toPath: NodePath;
}): boolean {
  if (fromPath === undefined || fromPath === null) return true;

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
