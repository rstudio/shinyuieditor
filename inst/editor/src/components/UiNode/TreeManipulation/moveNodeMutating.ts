import { moveElement, addAtIndex } from "util-functions/src/arrays";

import type { ShinyUiNode } from "../../../main";
import type { NodePath } from "../../../Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "../../../Shiny-Ui-Elements/uiNodeTypes";

import { getNode } from "./getNode";
import { getParentPath } from "./getParentPath";
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

  // If there's a current path for the node, then this is a move rather than a
  // pure add of a node
  const nextPath = [...parentPath, positionInChildren];

  // A special case of moving is reordering a node within the children.
  if (nodesAreSiblings(currentPath, nextPath)) {
    const previousIndex = currentPath[currentPath.length - 1];

    parentNode.uiChildren = moveElement(
      parentNode.uiChildren,
      previousIndex,
      positionInChildren
    );

    // We're done now so return early
    return;
  }

  removeNodeMutating(tree, { path: currentPath });

  parentNode.uiChildren = addAtIndex(
    parentNode.uiChildren,
    positionInChildren,
    node
  );
}
