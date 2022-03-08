import React from "react";

import { NodePath, ShinyUiNode } from "../../Elements/uiNodeTypes";

import { placeNode, PlaceNodeArguments } from "./placeNode";
import { removeNode } from "./removeNode";
import { updateNode } from "./updateNode";

export type TreeUpdateAction =
  | { type: "UPDATE_NODE"; path: NodePath; node: ShinyUiNode }
  | ({ type: "PLACE_NODE" } & PlaceNodeArguments)
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
  const [selectedPath, setSelectedPath] = React.useState<NodePath | null>(null);

  React.useEffect(() => onStateChange(tree), [onStateChange, tree]);

  // We memoize this callback so we aren't constantly adding and removing the
  // tree-update event listener which may miss messages
  const handleUpdateEvent = React.useCallback((action: TreeUpdateAction) => {
    updateTree(action);

    if (action.type === "PLACE_NODE") {
      // Update the selection to be wherever that node was placed
      const newPath = action.parentPath;
      if (typeof action.positionInChildren === "number") {
        newPath.push(action.positionInChildren);
      }
      setSelectedPath(newPath);
    }

    if (action.type === "DELETE_NODE") {
      setSelectedPath((oldPath) => {
        if (oldPath === null) {
          return null;
        }

        return oldPath.slice(0, oldPath.length - 1);
      });
    }
  }, []);
  useListenForTreeUpdateEvent(handleUpdateEvent);

  return { tree, selectedPath, setSelectedPath };
}

function treeUpdateReducer(
  tree: ShinyUiNode,
  action: TreeUpdateAction
): ShinyUiNode {
  switch (action.type) {
    case "UPDATE_NODE":
      return updateNode(tree, { path: action.path, node: action.node });

    case "DELETE_NODE":
      return removeNode(tree, { path: action.path });

    case "PLACE_NODE":
      return placeNode(tree, { ...action });
  }
}
