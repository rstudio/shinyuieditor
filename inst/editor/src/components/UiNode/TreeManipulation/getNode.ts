import type { ShinyUiNode, NodePath } from "Shiny-Ui-Elements/uiNodeTypes";

import { checkIfContainerNode } from "./checkIfContainerNode";

/**
 * Navigate to a node in a UiTree at the provided path
 */
export function getNode(tree: ShinyUiNode, path: NodePath): ShinyUiNode {
  let currNode: ShinyUiNode = tree;
  let currPath: number;
  for (currPath of path) {
    if (!checkIfContainerNode(currNode)) {
      throw new Error("Somehow trying to enter a leaf node");
    }

    currNode = currNode.uiChildren[currPath];
  }

  return currNode;
}
