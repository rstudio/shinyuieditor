import React from "react";
import { addNode, removeNode, updateNode } from "../UiNode/treeManipulation";
import { NodePath, ShinyUiNameAndArguments, UiNodeProps } from "../uiNodeTypes";

type TreeUpdateAction =
  | { type: "UPDATE_NODE"; path: NodePath; newNode: UiNodeProps }
  | { type: "ADD_NODE"; parentPath: NodePath; newNode: UiNodeProps }
  | { type: "DELETE_NODE"; path: NodePath };

type TreeUpdateEvent = CustomEvent<TreeUpdateAction>;

// Let Typescript know this is a valid new event type
declare global {
  interface DocumentEventMap {
    "tree-update": TreeUpdateEvent;
  }
}

export function sendTreeUpdateMessage(updateAction: TreeUpdateAction) {
  document.dispatchEvent(
    new CustomEvent("tree-update", {
      detail: updateAction,
    })
  );
}

export function useListenForTreeUpdateEvent(
  onUpdate: (updateAction: TreeUpdateAction) => void
) {
  const handleUpdateEvent = React.useCallback(
    ({ detail }: TreeUpdateEvent) => {
      onUpdate(detail);
    },
    [onUpdate]
  );

  React.useEffect(() => {
    document.addEventListener("tree-update", handleUpdateEvent);
    return () => document.removeEventListener("tree-update", handleUpdateEvent);
  }, [handleUpdateEvent]);
}

export function useEventUpdatedTree(initialState: ShinyUiNameAndArguments) {
  const [tree, updateTree] = React.useReducer(treeUpdateReducer, initialState);

  useListenForTreeUpdateEvent(updateTree);

  return tree;
}

function treeUpdateReducer(
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
