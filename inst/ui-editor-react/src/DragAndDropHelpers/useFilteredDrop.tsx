import React from "react";

import classes from "./DragAndDrop.module.css";
import type { DraggedNodeInfo } from "./DragAndDropHelpers";
import { useCurrentDraggedNode } from "./useCurrentDraggedNode";

type DropHandlerArguments = {
  watcherRef: React.RefObject<HTMLDivElement>;
  getCanAcceptDrop?: (droppedNode: DraggedNodeInfo) => void;
  onDrop: (droppedNode: DraggedNodeInfo) => void;
  canAcceptDropClass?: string;
  hoveringOverClass?: string;
};

export function useFilteredDrop({
  watcherRef,
  getCanAcceptDrop = () => true,
  onDrop,
  canAcceptDropClass = classes.canAcceptDrop,
  hoveringOverClass = classes.hoveringOver,
}: DropHandlerArguments) {
  const [currentlyDragged, setCurrentlyDragged] = useCurrentDraggedNode();

  const {
    addCanAcceptDropHighlight,
    addHoveredOverHighlight,
    removeHoveredOverHighlight,
    removeAllHighlights,
  } = useDropHighlights({ canAcceptDropClass, hoveringOverClass });

  // If there's no position in the children provided then we know that
  const canAcceptDrop = currentlyDragged
    ? getCanAcceptDrop(currentlyDragged)
    : false;

  const handleDragOver = React.useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      // Make sure our dropability is properly highlighted. This fires very fast
      // so if this function gets any more complicated the callback should most
      // likely be throttled
      addHoveredOverHighlight(e);
    },
    [addHoveredOverHighlight]
  );

  const handleDragLeave = React.useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      removeHoveredOverHighlight(e);
    },
    [removeHoveredOverHighlight]
  );

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
    [
      canAcceptDrop,
      currentlyDragged,
      onDrop,
      removeHoveredOverHighlight,
      setCurrentlyDragged,
    ]
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
  }, [
    addCanAcceptDropHighlight,
    canAcceptDrop,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    removeAllHighlights,
    watcherRef,
  ]);
}

function useDropHighlights({
  canAcceptDropClass,
  hoveringOverClass,
}: {
  canAcceptDropClass: string;
  hoveringOverClass: string;
}) {
  const addCanAcceptDropHighlight = React.useCallback(
    (el: HTMLElement) => {
      el.classList.add(canAcceptDropClass);
    },
    [canAcceptDropClass]
  );

  const addHoveredOverHighlight = React.useCallback(
    (e: DragEvent | React.DragEvent<HTMLDivElement>) => {
      if (!e.currentTarget) return;
      if (e.currentTarget === e.target) {
        (e.currentTarget as HTMLElement).classList.add(hoveringOverClass);
      }
    },
    [hoveringOverClass]
  );

  const removeHoveredOverHighlight = React.useCallback(
    (e: DragEvent | React.DragEvent<HTMLDivElement>) => {
      if (!e.currentTarget) return;

      const el = e.currentTarget as HTMLElement;
      el.classList.remove(hoveringOverClass);
    },
    [hoveringOverClass]
  );

  const removeAllHighlights = React.useCallback(
    (el: HTMLElement) => {
      el.classList.remove(hoveringOverClass);
      el.classList.remove(canAcceptDropClass);
    },
    [canAcceptDropClass, hoveringOverClass]
  );

  return {
    addCanAcceptDropHighlight,
    addHoveredOverHighlight,
    removeHoveredOverHighlight,
    removeAllHighlights,
  };
}
