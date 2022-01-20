import React from "react";
import { NodePath, UiNode, UiNodeProps } from "../UiNode/index";

// Immutable updater functions
import { removeNode } from "../UiNode/removeNode";
import { replaceNode } from "../UiNode/updateNode";

export const NodeUpdateContext = React.createContext({
  updateNode: (path: NodePath, newNode: UiNodeProps) =>
    console.log(`Updating placeholder`),
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
