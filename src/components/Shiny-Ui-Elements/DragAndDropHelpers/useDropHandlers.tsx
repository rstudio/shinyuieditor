import React from "react";

import { NodePath } from "../Elements/uiNodeTypes";
import { sendTreeUpdateMessage } from "../UiNode/TreeManipulation/treeUpdateEvents";

import {
  DraggedNodeInfo,
  highlightDropability,
  removeHighlight,
} from "./DragAndDropHelpers";
import { useCurrentDraggedNode } from "./useCurrentDraggedNode";

export function useDropHandlers(
  onDrop: (droppedNode: DraggedNodeInfo) => void
) {
  const currentlyDragged = useCurrentDraggedNode();
  return {
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      // Update styles to indicate the user can drop item here
      highlightDropability(e);
    },
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      removeHighlight(e);
    },
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      // Make sure our dropability is properly highlighted. This fires very fast
      // so if this function gets any more complicated the callback should most
      // likely be throttled
      highlightDropability(e);
    },
    onDrop: (e: React.DragEvent<HTMLDivElement>) => {
      // Make sure only the deepest container gets the drop event
      e.stopPropagation();

      removeHighlight(e);

      // Get the type of dropped element and act on it
      if (!currentlyDragged) {
        console.error("No dragged node in context but a drop was detected...");
        return;
      }
      onDrop(currentlyDragged);
    },
  };
}

export function useAddOnDropHandlers({
  parentPath,
  positionInChildren,
}: {
  parentPath: NodePath;
  positionInChildren: number;
}) {
  return useDropHandlers((droppedNode) => {
    sendTreeUpdateMessage({
      type: "PLACE_NODE",
      ...droppedNode,
      parentPath,
      positionInChildren,
    });
  });
}
