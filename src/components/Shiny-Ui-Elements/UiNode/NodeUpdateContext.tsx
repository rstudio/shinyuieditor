import React from "react";
import { NodePath, UiNodeProps } from "../uiNodeTypes";
import { updateNode, removeNode, addNode } from "./treeManipulation";

export type NodeUpdaters = {
  updateNode: (path: NodePath, newNode: UiNodeProps) => void;
  addNode: (path: NodePath, newNode: UiNodeProps) => void;
  deleteNode: (path: NodePath) => void;
};

export type TreeUpdateAction =
  | { type: "UPDATE_NODE"; path: NodePath; newNode: UiNodeProps }
  | { type: "ADD_NODE"; parentPath: NodePath; newNode: UiNodeProps }
  | { type: "DELETE_NODE"; path: NodePath };

type treeUpdateDispatch = React.Dispatch<TreeUpdateAction>;

export function treeUpdateReducer(
  tree: UiNodeProps,
  action: TreeUpdateAction
): UiNodeProps {
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

const NodeUpdateContext = React.createContext<treeUpdateDispatch>((action) =>
  console.log("Updated state with action", action)
);

export default NodeUpdateContext;
