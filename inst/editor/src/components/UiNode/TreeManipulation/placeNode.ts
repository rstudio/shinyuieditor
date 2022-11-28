import produce from "immer";

import type { ShinyUiNode } from "../../../main";

import type { AddNodeArguments } from "./addNodeMutating";
import { addNodeMutating } from "./addNodeMutating";
import type { MoveNodeArguments } from "./moveNodeMutating";
import { moveNodeMutating } from "./moveNodeMutating";

/**
 * Arguments to add a new node to a Shiny Ui Node tree
 */
export type PlaceNodeArguments = MoveNodeArguments | AddNodeArguments;

export function isNodeMove(
  opts: PlaceNodeArguments
): opts is MoveNodeArguments {
  return "currentPath" in opts && opts.currentPath !== undefined;
}
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
  const { path, node } = args;

  if (isNodeMove(args)) {
    moveNodeMutating(tree, { path, currentPath: args.currentPath, node });
    return;
  }

  addNodeMutating(tree, { path, node: args.node });
}
