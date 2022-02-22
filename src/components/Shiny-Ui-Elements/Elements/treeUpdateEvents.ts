import React from "react";
import { addNode, removeNode, updateNode } from "../UiNode/treeManipulation";
import { NodePath, ShinyUiNode, UiNodeProps } from "../uiNodeTypes";

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

  interface HTMLElementEventMap {
    "tree-update": TreeUpdateEvent;
  }
}

/**
 * Send tree update message on the document object
 * @param updateAction Object describing the action to be dispatched
 */
export function sendTreeUpdateMessage(updateAction: TreeUpdateAction) {
  document.dispatchEvent(
    new CustomEvent("tree-update", {
      detail: updateAction,
    })
  );
}

/**
 * Run a function anytime a tree update event passes by this component
 * @param onUpdate Callback to run after receiving a tree update action
 */
export function useListenForTreeUpdateEvent(
  onUpdate: (action: TreeUpdateAction) => void
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

/**
 * Create a UI Node tree dataset that will update in response to tree update
 * events
 * @param initialState Starting state of the UI Tree
 * @param onStateChange Callback to be run everytime the state is updated
 * @returns Most recent state of the ui tree
 */
export function useEventUpdatedTree(
  initialState: ShinyUiNode,
  onStateChange: (state: ShinyUiNode) => void
) {
  const [tree, updateTree] = React.useReducer(treeUpdateReducer, initialState);

  React.useEffect(() => onStateChange(tree), [onStateChange, tree]);

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
