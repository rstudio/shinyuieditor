import React from "react";

import { NodePath, ShinyUiNode } from "../../Elements/uiNodeTypes";

import { placeNode } from "./placeNode";
import { removeNode, updateNode } from "./treeManipulation";

export type TreeUpdateAction =
  | { type: "UPDATE_NODE"; path: NodePath; node: ShinyUiNode }
  | { type: "ADD_NODE"; parentPath: NodePath; node: ShinyUiNode }
  | {
      type: "MOVE_NODE";
      node: ShinyUiNode;
      fromPath: NodePath;
      toPath: NodePath;
    }
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
  tree: ShinyUiNode,
  action: TreeUpdateAction
): ShinyUiNode {
  switch (action.type) {
    case "ADD_NODE":
      return placeNode({
        tree,
        parentPath: action.parentPath,
        node: action.node,
      });

    case "UPDATE_NODE":
      return updateNode({ tree, path: action.path, node: action.node });

    case "DELETE_NODE":
      return removeNode({ tree, path: action.path });

    case "MOVE_NODE":
      return placeNode({
        tree,
        currentPath: action.fromPath,
        parentPath: action.toPath,
        node: action.node,
      });
  }
}
