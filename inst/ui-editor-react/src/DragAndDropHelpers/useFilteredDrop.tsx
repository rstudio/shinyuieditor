import React from "react";

import type { DraggedNodeInfo } from "./DragAndDropHelpers";
import {
  highlightDropability,
  highlightDropAvailability,
  removeHighlight,
  resetHighlights,
} from "./DragAndDropHelpers";
import { useCurrentDraggedNode } from "./useCurrentDraggedNode";

type DropHandlerArguments = {
  watcherRef: React.RefObject<HTMLDivElement>;
  getCanAcceptDrop?: (droppedNode: DraggedNodeInfo) => void;
  onDrop: (droppedNode: DraggedNodeInfo) => void;
};

export function useFilteredDrop({
  watcherRef,
  getCanAcceptDrop = () => true,
  onDrop,
}: DropHandlerArguments) {
  const [currentlyDragged, setCurrentlyDragged] = useCurrentDraggedNode();

  // If there's no position in the children provided then we know that
  const canAcceptDrop = currentlyDragged
    ? getCanAcceptDrop(currentlyDragged)
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

      if (canAcceptDrop) {
        onDrop(currentlyDragged);
      } else {
        console.error("Incompatable drag pairing");
      }

      // Turn off drag
      setCurrentlyDragged(null);
    },
    [canAcceptDrop, currentlyDragged, onDrop, setCurrentlyDragged]
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
