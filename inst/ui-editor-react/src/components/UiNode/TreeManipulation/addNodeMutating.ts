import type { ShinyUiNode, NodePath } from "Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "Shiny-Ui-Elements/uiNodeTypes";
import { addAtIndex } from "utils/array-helpers";

import { getNode } from "./getNode";
import { getParentPath } from "./getParentPath";

export function addNodeMutating(
  tree: ShinyUiNode,
  { path, node }: AddNodeArguments
) {
  const parentPath = getParentPath(path);
  const positionInChildren = path[path.length - 1];
  const parentNode = getNode(tree, parentPath);

  if (!shinyUiNodeInfo[parentNode.uiName].acceptsChildren) {
    throw new Error(
      "Can't add a child to a non-container node. Check the path"
    );
  }

  // If this is the first child we may need to create the uiChildren array first
  if (!Array.isArray(parentNode.uiChildren)) {
    parentNode.uiChildren = [];
  }

  parentNode.uiChildren = addAtIndex(
    parentNode.uiChildren,
    positionInChildren,
    node
  );
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
