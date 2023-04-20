import type { NodePath } from "ui-node-definitions/src/NodePath";
import type {
  ShinyUiNode,
  ShinyUiParentNode,
} from "ui-node-definitions/src/uiNodeTypes";
import { moveElement } from "util-functions/src/arrays";

import { addNodeMutating } from "./addNodeMutating";
import { getNode } from "./getNode";
import { separateIntoParentAndChildPaths } from "./getParentPath";
import { nodesAreSiblings } from "./nodesAreSiblings";
import { removeNodeMutating } from "./removeNode";

/**
 * Arguments for moving a node within a Shiny Ui Node tree
 */
export type MoveNodeArguments = {
  /**
   * New path to place the node at
   */
  path: NodePath;

  /**
   * The full current path of the node, if it is being moved and added
   */
  currentPath: NodePath;

  /**
   * Node being moved. This is needed even though we have the previous path in
   * case we needed to process the node during manipulation such as placing the
   * node inside a container etc..
   */
  node: ShinyUiNode;
};

export function moveNodeMutating(
  tree: ShinyUiNode,
  { path, currentPath, node }: MoveNodeArguments
) {
  const destination_paths = separateIntoParentAndChildPaths(path);
  const current_paths = separateIntoParentAndChildPaths(currentPath);

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

    if (current_paths.child_location === "children") {
      // Siblings are a special scenario we need to account for. The problem we
      // face is that the final index of the node will shift when we remove the
      // node from it's previous place in certain scenarios. The moveElement
      // function deals with this for us
      if (nodesAreSiblings(currentPath, path)) {
        destination_parent.children = moveElement(
          destination_parent.children,
          current_paths.child_path,
          destination_paths.child_path
        );

        // We're done now so return early
        return;
      }
    }
  }

  // Remove the node from its current location
  removeNodeMutating(tree, { path: currentPath });

  // Add the node to its new location
  addNodeMutating(tree, { path, node });
}
