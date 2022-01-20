import React from "react";
import {
  isContainerNode,
  NodePath,
  UiNode,
  UiNodeProps,
} from "../UiNode/index";
import { removeNode } from "./removeNode";

function buildUiPath(path: NodePath) {
  let fullPath: (string | number)[] = [];
  let childIndex: number;
  for (childIndex of path) {
    fullPath.push("uiChildren");
    fullPath.push(childIndex);
  }
  return fullPath;
}

function getNode(tree: UiNodeProps, path: NodePath): UiNodeProps {
  let currNode: UiNodeProps = tree;
  let currPath: number;
  for (currPath of path) {
    if (!isContainerNode(currNode)) {
      throw new Error("Somehow trying to enter a leaf node");
    }

    currNode = currNode.uiChildren[currPath];
  }

  return currNode;
}

function printPath(path: NodePath) {
  return `[${buildUiPath(path).join(",")}]`;
}

function updateNode(path: NodePath, newNode: UiNodeProps) {
  console.log(`Updating node at path ${printPath(path)}`);
}

function deleteNode(path: NodePath) {
  console.log(`Deleting node at path ${printPath(path)}`);
}

export const NodeUpdateContext = React.createContext({
  updateNode,
  deleteNode,
});

export default function UiTree(uiTree: UiNodeProps) {
  console.log("Rendered UiTree");

  const [tree, setTree] = React.useState(uiTree);

  const updateNode = React.useCallback(
    (path: NodePath, newNode: UiNodeProps) => {
      console.log("Update node internally");
    },
    []
  );

  const deleteNode = React.useCallback((path: NodePath) => {
    console.log(`Deleting node at path ${printPath(path)}`);

    setTree((oldTree) => removeNode(oldTree, path));
  }, []);

  return (
    <NodeUpdateContext.Provider value={{ updateNode, deleteNode }}>
      <UiNode {...tree} />
    </NodeUpdateContext.Provider>
  );
}
