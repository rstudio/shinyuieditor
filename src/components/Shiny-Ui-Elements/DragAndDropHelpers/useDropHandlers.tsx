import React from "react";

import { NodePath, shinyUiNames, ShinyUiNames } from "../Elements/uiNodeTypes";
import { sendTreeUpdateMessage } from "../UiNode/TreeManipulation/treeUpdateEvents";

import {
  DraggedNodeInfo,
  highlightDropability,
  highlightDropAvailability,
  removeHighlight,
  resetHighlights,
} from "./DragAndDropHelpers";
import { useCurrentDraggedNode } from "./useCurrentDraggedNode";

type DropFilters =
  | {
      acceptedNodes: ShinyUiNames[];
    }
  | {
      rejectedNodes: ShinyUiNames[];
    };

type DropHandlerArguments = {
  dropFilters?: DropFilters;
} & (
  | {
      onDrop: "add-node";
      parentPath: NodePath;
      positionInChildren: number;
    }
  | {
      onDrop: (droppedNode: DraggedNodeInfo) => void;
    }
);

export function useDropHandlers(
  watcherRef: React.RefObject<HTMLDivElement>,
  opts: DropHandlerArguments
) {
  const currentlyDragged = useCurrentDraggedNode();

  const { dropFilters = { rejectedNodes: [] } } = opts;
  const acceptedNodes = React.useMemo(
    () =>
      "acceptedNodes" in dropFilters
        ? dropFilters.acceptedNodes
        : shinyUiNames.filter(
            (uiName) => !dropFilters.rejectedNodes.includes(uiName)
          ),
    [dropFilters]
  );

  const canAcceptDragged = currentlyDragged
    ? acceptedNodes.includes(currentlyDragged.node.uiName)
    : false;

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    // Update styles to indicate the user can drop item here
    highlightDropability(e);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    removeHighlight(e);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    // Make sure our dropability is properly highlighted. This fires very fast
    // so if this function gets any more complicated the callback should most
    // likely be throttled
    highlightDropability(e);
  };

  const handleDrop = React.useCallback(
    (e: DragEvent) => {
      // Make sure only the deepest container gets the drop event
      e.stopPropagation();

      removeHighlight(e);

      // Get the type of dropped element and act on it
      if (!currentlyDragged) {
        console.error("No dragged node in context but a drop was detected...");
        return;
      }

      if (canAcceptDragged) {
        if (opts.onDrop === "add-node") {
          const { parentPath, positionInChildren } = opts;
          sendTreeUpdateMessage({
            type: "PLACE_NODE",
            ...currentlyDragged,
            parentPath,
            positionInChildren,
          });
        } else {
          opts.onDrop(currentlyDragged);
        }
      } else {
        console.error("Incompatable drag pairing");
      }
    },
    [canAcceptDragged, currentlyDragged, opts]
  );

  React.useEffect(() => {
    const watcherEl = watcherRef.current;
    if (!watcherEl) return;

    if (canAcceptDragged) {
      highlightDropAvailability(watcherEl);

      watcherEl.addEventListener("dragenter", handleDragEnter);
      watcherEl.addEventListener("dragleave", handleDragLeave);
      watcherEl.addEventListener("dragover", handleDragOver);
      watcherEl.addEventListener("drop", handleDrop);
    }

    return () => {
      resetHighlights(watcherEl);

      watcherEl.removeEventListener("dragenter", handleDragEnter);
      watcherEl.removeEventListener("dragleave", handleDragLeave);
      watcherEl.removeEventListener("dragover", handleDragOver);
      watcherEl.removeEventListener("drop", handleDrop);
    };
  }, [canAcceptDragged, handleDrop, watcherRef]);
}
