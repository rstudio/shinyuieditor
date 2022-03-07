import React from "react";

import { NodePath, shinyUiNames, ShinyUiNames } from "../Elements/uiNodeTypes";
import { sendTreeUpdateMessage } from "../UiNode/TreeManipulation/treeUpdateEvents";

import {
  DraggedNodeInfo,
  highlightDropability,
  removeHighlight,
} from "./DragAndDropHelpers";
import { useCurrentDraggedNode } from "./useCurrentDraggedNode";

type DropFilters =
  | {
      acceptedNodes: ShinyUiNames[];
    }
  | {
      rejectedNodes: ShinyUiNames[];
    };

export function useDropHandlers({
  onDrop,
  dropFilters = { rejectedNodes: [] },
}: {
  onDrop: (droppedNode: DraggedNodeInfo) => void;
  dropFilters?: DropFilters;
}) {
  const currentlyDragged = useCurrentDraggedNode();

  const acceptedNodes =
    "acceptedNodes" in dropFilters
      ? dropFilters.acceptedNodes
      : shinyUiNames.filter(
          (uiName) => !dropFilters.rejectedNodes.includes(uiName)
        );

  console.log("Accepting drops from the following ui types", acceptedNodes);

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
  dropFilters,
}: {
  parentPath: NodePath;
  positionInChildren: number;
  dropFilters?: DropFilters;
}) {
  return useDropHandlers({
    onDrop: (droppedNode) => {
      sendTreeUpdateMessage({
        type: "PLACE_NODE",
        ...droppedNode,
        parentPath,
        positionInChildren,
      });
    },
    dropFilters,
  });
}
