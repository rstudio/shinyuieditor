import React from "react";

import type { NodePath, ShinyUiNode } from "../../Elements/uiNodeTypes";

import type { PlaceNodeArguments } from "./placeNode";

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
