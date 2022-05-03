import React from "react";

import classes from "./DragAndDrop.module.css";
import type { DraggedNodeInfo } from "./DragAndDropHelpers";
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

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    // Make sure our dropability is properly highlighted. This fires very fast
    // so if this function gets any more complicated the callback should most
    // likely be throttled
    addHoveredOverHighlight(e);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    removeHoveredOverHighlight(e);
  };

  const handleDrop = React.useCallback(
    (e: DragEvent) => {
      // Make sure only the deepest container gets the drop event
      e.stopPropagation();

      removeHoveredOverHighlight(e);

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
      addCanAcceptDropHighlight(watcherEl);

      watcherEl.addEventListener("dragenter", handleDragOver);
      watcherEl.addEventListener("dragleave", handleDragLeave);
      watcherEl.addEventListener("dragover", handleDragOver);
      watcherEl.addEventListener("drop", handleDrop);
    }

    return () => {
      removeAllHighlights(watcherEl);

      watcherEl.removeEventListener("dragenter", handleDragOver);
      watcherEl.removeEventListener("dragleave", handleDragLeave);
      watcherEl.removeEventListener("dragover", handleDragOver);
      watcherEl.removeEventListener("drop", handleDrop);
    };
  }, [canAcceptDrop, currentlyDragged, handleDrop, watcherRef]);
}

function addCanAcceptDropHighlight(el: HTMLElement) {
  el.classList.add(classes.availableForDrop);
}

function getIsCurrentTarget(
  e: DragEvent | React.DragEvent<HTMLDivElement>
): boolean {
  if (!e.currentTarget) return false;

  return e.currentTarget === e.target;
}

function addHoveredOverHighlight(
  e: DragEvent | React.DragEvent<HTMLDivElement>
) {
  if (getIsCurrentTarget(e)) if (!e.currentTarget) return;
  if (e.currentTarget === e.target) {
    (e.currentTarget as HTMLElement).classList.add(classes.canDrop);
  }
}

function removeHoveredOverHighlight(
  e: DragEvent | React.DragEvent<HTMLDivElement>
) {
  if (!e.currentTarget) return;

  const el = e.currentTarget as HTMLElement;
  el.classList.remove(classes.canDrop);
}

function removeAllHighlights(el: HTMLElement) {
  el.classList.remove(classes.canDrop);
  el.classList.remove(classes.availableForDrop);
}
