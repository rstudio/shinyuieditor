import React from "react";

import type {
  NodePath,
  ShinyUiNames,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { useDispatch } from "react-redux";
import { PLACE_NODE } from "state/uiTree";

import { getIsValidMove } from "../components/UiNode/TreeManipulation/placeNode";

import type { DraggedNodeInfo } from "./DragAndDropHelpers";
import {
  highlightDropability,
  highlightDropAvailability,
  removeHighlight,
  resetHighlights,
} from "./DragAndDropHelpers";
import { useCurrentDraggedNode } from "./useCurrentDraggedNode";

type DropHandlerArguments = {
  dropFilters?: DropFilters;
  parentPath: NodePath;
  positionInChildren?: number;
  onDrop: "add-node" | ((droppedNode: DraggedNodeInfo) => void);
};

export function useDropHandlers(
  watcherRef: React.RefObject<HTMLDivElement>,
  {
    dropFilters = { rejectedNodes: [] },
    positionInChildren = 0,
    parentPath,
    onDrop,
  }: DropHandlerArguments
) {
  const dispatch = useDispatch();

  const [currentlyDragged, setCurrentlyDragged] = useCurrentDraggedNode();

  // Function that tests a given dragged node to see if the current container is
  // capable of housing it as a child
  const acceptsDraggedNode = React.useMemo(
    () => getAcceptsDraggedNode(dropFilters, currentlyDragged?.node),
    [currentlyDragged, dropFilters]
  );

  const canAcceptDrop =
    acceptsDraggedNode &&
    getIsValidMove({
      fromPath: currentlyDragged?.currentPath,
      toPath: [...parentPath, positionInChildren],
    });

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

      if (canAcceptDrop) {
        if (onDrop === "add-node") {
          dispatch(
            PLACE_NODE({
              ...currentlyDragged,
              parentPath,
              positionInChildren,
            })
          );
        } else {
          onDrop(currentlyDragged);
        }
      } else {
        console.error("Incompatable drag pairing");
      }

      // Turn off drag
      setCurrentlyDragged(null);
    },
    [
      canAcceptDrop,
      currentlyDragged,
      dispatch,
      onDrop,
      parentPath,
      positionInChildren,
      setCurrentlyDragged,
    ]
  );

  React.useEffect(() => {
    const watcherEl = watcherRef.current;
    if (!watcherEl) return;

    if (canAcceptDrop) {
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
  }, [canAcceptDrop, currentlyDragged, handleDrop, watcherRef]);
}

type DropFilters =
  | {
      acceptedNodes: ShinyUiNames[];
    }
  | {
      rejectedNodes: ShinyUiNames[];
    }
  | {
      getCanAcceptDrop: (droppedNode: ShinyUiNode) => boolean;
    };

function getAcceptsDraggedNode(
  dropFilters: DropFilters,
  draggedNode?: ShinyUiNode
): boolean {
  if (draggedNode === undefined) {
    return false;
  }

  if ("getCanAcceptDrop" in dropFilters) {
    return dropFilters.getCanAcceptDrop(draggedNode);
  }

  if ("acceptedNodes" in dropFilters) {
    return dropFilters.acceptedNodes.includes(draggedNode.uiName);
  }

  if ("rejectedNodes" in dropFilters) {
    return !dropFilters.rejectedNodes.includes(draggedNode.uiName);
  }

  throw new Error(
    "Unexpected drop filter setup. Check accepted and rejected node types."
  );
}
