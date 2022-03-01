import React from "react";
import { NodePath, ShinyUiNode } from "../Elements/uiNodeTypes";
import { addNode, removeNode, updateNode } from "./treeManipulation";

export type TreeUpdateAction =
  | { type: "UPDATE_NODE"; path: NodePath; newNode: ShinyUiNode }
  | { type: "ADD_NODE"; parentPath: NodePath; newNode: ShinyUiNode }
  | { type: "DELETE_NODE"; path: NodePath };

export function treeUpdateReducer(
  tree: ShinyUiNode,
  action: TreeUpdateAction
): ShinyUiNode {
  switch (action.type) {
    case "ADD_NODE":
      return addNode({
        tree,
        path: action.parentPath,
        newNode: action.newNode,
      });

    case "UPDATE_NODE":
      return updateNode({ tree, path: action.path, newNode: action.newNode });

    case "DELETE_NODE":
      return removeNode({ tree, path: action.path });
  }
}

const NodeUpdateContext = React.createContext<React.Dispatch<TreeUpdateAction>>(
  (action) => console.log("Updated state with action", action)
);

export default NodeUpdateContext;
