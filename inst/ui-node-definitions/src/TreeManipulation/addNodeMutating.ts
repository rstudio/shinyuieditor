import { addAtIndex } from "util-functions/src/arrays";

import type { NodePath } from "../NodePath";
import type { ShinyUiNode, ShinyUiParentNode } from "../uiNodeTypes";

import { getNode } from "./getNode";
import { separateIntoParentAndChildPaths } from "./getParentPath";

export function addNodeMutating(
  tree: ShinyUiNode,
  { path, node }: AddNodeArguments
) {
  const destination_paths = separateIntoParentAndChildPaths(path);

  const destination_parent = getNode(
    tree,
    destination_paths.parent_path
  ) as ShinyUiParentNode;

  if (destination_paths.child_location === "children") {
    // If the destination parent node doesn't have ui children, then we need to create it
    if (
      !("children" in destination_parent) ||
      destination_parent.children === undefined
    ) {
      destination_parent.children = [];
    }

    // Add node to new children position
    destination_parent.children = addAtIndex(
      destination_parent.children as ShinyUiNode[],
      destination_paths.child_path,
      node
    );

    return;
  }

  if (destination_paths.child_location === "namedArgs") {
    // Add node to new arguments position
    destination_parent.namedArgs[destination_paths.child_path] = node;

    return;
  }

  throw new Error("Failed to add node to tree at path " + path);
}
/**
 * Arguments to add a new node to a Shiny Ui Node tree
 */

export type AddNodeArguments = {
  /**
   * New path to place the node at
   */
  path: NodePath;
  /**
   * Node to be added
   */
  node: ShinyUiNode;
};
