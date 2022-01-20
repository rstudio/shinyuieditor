import React from "react";
import getNode from "../UiNode/getNode";
import { NodePath, UiNode, UiNodeProps } from "../UiNode/index";
import { removeNode } from "../UiNode/removeNode";

function buildUiPath(path: NodePath) {
  let fullPath: (string | number)[] = [];
  let childIndex: number;
  for (childIndex of path) {
    fullPath.push("uiChildren");
    fullPath.push(childIndex);
  }
  return fullPath;
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
  const [tree, setTree] = React.useState(uiTree);

  const updateNode = React.useCallback(
    (path: NodePath, newNode: UiNodeProps) => {
      console.log("Editing node", getNode(tree, path));
    },
    [tree]
  );

  const deleteNode = React.useCallback((path: NodePath) => {
    setTree((oldTree) => removeNode(oldTree, path));
  }, []);

  return (
    <NodeUpdateContext.Provider value={{ updateNode, deleteNode }}>
      <UiNode {...tree} />
    </NodeUpdateContext.Provider>
  );
}
