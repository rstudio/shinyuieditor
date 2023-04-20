import produce from "immer";
import type { NodePath } from "ui-node-definitions/src/NodePath";
import type { ShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

import { getNode } from "./getNode";

/**
 * Arguments to remove node from the Shiny Ui Node tree
 */
export type UpdateNodeArguments = {
  /**
   * The full current path of the node, if it is being moved and added
   */
  path: NodePath;
  /**
   * New node values to be added. This node will be merged with the old node so
   * things like children wont get removed if you just change a setting
   */
  node: Partial<ShinyUiNode>;
};

/**
 * Update the namedArgs and id of a node but leave the children alone
 */
export function updateNode(
  tree: ShinyUiNode,
  { path, node }: UpdateNodeArguments
) {
  return produce(tree, (treeDraft) => {
    updateNodeMutating(treeDraft, { path, node });
  });
}

export function updateNodeMutating(
  tree: ShinyUiNode,
  { path, node }: UpdateNodeArguments
): void {
  const existingNode = getNode(tree, path);

  Object.assign(existingNode, node);
}
