import type {
  NodePath,
  ShinyUiNode,
} from "../../../Shiny-Ui-Elements/uiNodeTypes";
import { isParentNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";

/**
 * Navigate to a node in a UiTree at the provided path
 */
export function getNode(tree: ShinyUiNode, path: NodePath): ShinyUiNode {
  let currNode: ShinyUiNode = tree;
  let currPath: number;
  for (currPath of path) {
    if (!isParentNode(currNode)) {
      throw new Error("Somehow trying to enter a leaf node");
    }

    currNode = currNode.uiChildren[currPath];
  }

  return currNode;
}
