import { addAtIndex } from "util-functions/src/arrays";

import type { ShinyUiNode } from "../../../main";
import type {
  NodePath,
  ShinyUiParentNode,
} from "../../../Shiny-Ui-Elements/uiNodeTypes";

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

  if (destination_paths.child_location === "uiChildren") {
    // If the destination parent node doesn't have ui children, then we need to create it
    if (
      !("uiChildren" in destination_parent) ||
      destination_parent.uiChildren === undefined
    ) {
      destination_parent.uiChildren = [];
    }

    // Add node to new children position
    destination_parent.uiChildren = addAtIndex(
      destination_parent.uiChildren as ShinyUiNode[],
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
