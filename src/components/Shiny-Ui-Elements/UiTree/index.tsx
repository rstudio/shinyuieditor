import React from "react";
import { UiNode } from "../UiNode/index";
import { NodePath, UiNodeProps } from "../UiNode/nodeTypes";

// Immutable updater functions
import { addNode, removeNode, replaceNode } from "../UiNode/treeManipulation";

export type NodeUpdaters = {
  updateNode: (path: NodePath, newNode: UiNodeProps) => void;
  addNode: (path: NodePath, newNode: UiNodeProps) => void;
  deleteNode: (path: NodePath) => void;
};

export const NodeUpdateContext = React.createContext<NodeUpdaters>({
  updateNode: (path: NodePath, newNode: UiNodeProps) =>
    console.log(`Updating placeholder`),
  addNode: (path: NodePath, newNode: UiNodeProps) =>
    console.log(`Adding placeholder`),
  deleteNode: (path: NodePath) => console.log(`Deleting placeholder`),
});

export default function UiTree(uiTree: UiNodeProps) {
  const [tree, setTree] = React.useState(uiTree);

  // Since these just use the setters they will never change over the lifecycle
  // of the component, so by wrapping in useMemo we can avoid unneccesary
  // rerenders caused by this object changing
  const editCallbacks = React.useMemo(
    () => ({
      updateNode: (path: NodePath, newNode: UiNodeProps) =>
        setTree((oldTree) => replaceNode({ tree: oldTree, path, newNode })),
      addNode: (path: NodePath, newNode: UiNodeProps) =>
        setTree((oldTree) => addNode({ tree: oldTree, path, newNode })),
      deleteNode: (path: NodePath) =>
        setTree((oldTree) => removeNode({ tree: oldTree, path })),
    }),
    []
  );

  // Render all the nodes in the tree and make available updater functions for
  // them to call to modify themselves
  return (
    <NodeUpdateContext.Provider value={editCallbacks}>
      <UiNode {...tree} />
    </NodeUpdateContext.Provider>
  );
}
