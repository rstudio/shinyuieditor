import produce from "immer";
import type { NodePath } from "ui-node-definitions/src/NodePath";
import type { ShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

import { getNode } from "./getNode";
import { separateIntoParentAndChildPaths } from "./getParentPath";

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
  const paths = separateIntoParentAndChildPaths(path);

  // Get the parent node first
  const parent_node = getNode(tree, paths.parent_path);

  // Check if we're removing a child node or an argument node

  if (paths.child_location === "namedArgs") {
    // We're removing an argument node
    if (parent_node.namedArgs[paths.child_path]) {
      delete parent_node.namedArgs[paths.child_path];
    } else {
      throw new Error("Trying to remove an argument that doesn't exist");
    }
  } else if (paths.child_location === "children") {
    // Make sure the child we're going to remove actually exists
    if (
      !("children" in parent_node) ||
      parent_node.children === undefined ||
      paths.child_path < 0 ||
      paths.child_path >= parent_node.children.length
    ) {
      throw new Error("Trying to remove a child that doesn't exist");
    }

    // Splice out this child
    parent_node.children.splice(paths.child_path, 1);
  }
}
