import React from "react";

import type {
  NodePath,
  ShinyUiNames,
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
} & (
  | {
      onDrop: "add-node";
    }
  | {
      onDrop: (droppedNode: DraggedNodeInfo) => void;
    }
);

export function useDropHandlers(
  watcherRef: React.RefObject<HTMLDivElement>,
  opts: DropHandlerArguments
) {
  const dispatch = useDispatch();

  const [currentlyDragged, setCurrentlyDragged] = useCurrentDraggedNode();

  const pathIfDropped: NodePath = [
    ...opts.parentPath,
    opts.positionInChildren ?? 0,
  ];

  const canAcceptDrop = getCanAcceptDrop(
    opts.dropFilters ?? { rejectedNodes: [] }
  );

  // Check to make sure that the drop position isn't the same position that the
  // node is currently in. Aka that moving will make a difference.
  const isValidMove =
    // opts.onDrop !== "add-node" ||
    currentlyDragged?.currentPath === undefined ||
    getIsValidMove({
      fromPath: currentlyDragged.currentPath,
      toPath: pathIfDropped,
    });

  const canAcceptDragged = canAcceptDrop(currentlyDragged) && isValidMove;

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

          dispatch(
            PLACE_NODE({
              ...currentlyDragged,
              parentPath,
              positionInChildren,
            })
          );
        } else {
          opts.onDrop(currentlyDragged);
        }
      } else {
        console.error("Incompatable drag pairing");
      }

      // Turn off drag
      setCurrentlyDragged(null);
    },
    [canAcceptDragged, currentlyDragged, dispatch, opts, setCurrentlyDragged]
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
  }, [canAcceptDragged, currentlyDragged, handleDrop, watcherRef]);
}

type DropFilters =
  | {
      acceptedNodes: ShinyUiNames[];
    }
  | {
      rejectedNodes: ShinyUiNames[];
    }
  | {
      getCanAcceptDrop: (droppedNode: DraggedNodeInfo) => boolean;
    };

function getCanAcceptDrop(
  dropFilters: DropFilters
): (draggedNode: DraggedNodeInfo | null) => boolean {
  let canAcceptDraggedType: (draggedNode: DraggedNodeInfo) => boolean;

  if ("getCanAcceptDrop" in dropFilters) {
    canAcceptDraggedType = dropFilters.getCanAcceptDrop;
  } else if ("acceptedNodes" in dropFilters) {
    canAcceptDraggedType = (draggedNode) =>
      dropFilters.acceptedNodes.includes(draggedNode.node.uiName);
  } else if ("rejectedNodes" in dropFilters) {
    canAcceptDraggedType = (draggedNode) =>
      !dropFilters.rejectedNodes.includes(draggedNode.node.uiName);
  } else {
    throw new Error(
      "Unexpected drop filter setup. Check accepted and rejected node types."
    );
  }

  return (draggedNode: DraggedNodeInfo | null) => {
    if (!draggedNode) return false;

    return canAcceptDraggedType(draggedNode);
  };
}
