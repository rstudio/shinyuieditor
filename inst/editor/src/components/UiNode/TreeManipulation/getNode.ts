import type {
  NodePath,
  ShinyUiNode,
  ShinyUiParentNode,
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

    currNode = getNodeChild(currNode, currPath);
  }

  return currNode;
}

function getNodeChild(node: ShinyUiParentNode, child_index: number) {
  const child_node = node.uiChildren?.[child_index];

  if (!child_node) {
    throw new Error(
      `Requested path does not exist. Attempt: parent: ${JSON.stringify(
        node,
        null,
        2
      )}, child_index: ${child_index}`
    );
  }

  return child_node;
}
