import React from "react";

import {
  useCurrentDraggedNode,
  useUnsetCurrentDraggedNode,
} from "../state/currentlyDraggedNode";

import "./DragAndDrop.css";
import type { DraggedNodeInfo } from "./DragAndDropHelpers";

export type DropHandlerArguments = {
  getCanAcceptDrop?: (droppedNode: DraggedNodeInfo) => void;
  onDrop: (droppedNode: DraggedNodeInfo) => void;
  onDragOver?: () => void;
  canAcceptDropClass?: string;
  hoveringOverClass?: string;
};

export function useFilteredDrop({
  getCanAcceptDrop = () => true,
  onDrop,
  onDragOver,
  canAcceptDropClass = "can-accept-drop",
  hoveringOverClass = "hovering-over",
}: DropHandlerArguments) {
  const watcherRef = React.useRef<HTMLDivElement>(null);

  const currentlyDragged = useCurrentDraggedNode();
  const unsetCurrentlyDragged = useUnsetCurrentDraggedNode();

  const {
    addCanAcceptDropHighlight,
    addHoveredOverHighlight,
    removeHoveredOverHighlight,
    removeAllHighlights,
  } = useDropHighlights({ watcherRef, canAcceptDropClass, hoveringOverClass });

  // If there's no position in the children provided then we know that
  const canAcceptDrop = currentlyDragged
    ? getCanAcceptDrop(currentlyDragged)
    : false;

  const handleDragOver = React.useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Make sure our dropability is properly highlighted. This fires very fast
      // so if this function gets any more complicated the callback should most
      // likely be throttled
      addHoveredOverHighlight();
      onDragOver?.();
    },
    [addHoveredOverHighlight, onDragOver]
  );

  const handleDragLeave = React.useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      removeHoveredOverHighlight();
    },
    [removeHoveredOverHighlight]
  );

  const handleDrop = React.useCallback(
    (e: DragEvent) => {
      // Make sure only the deepest container gets the drop event
      e.stopPropagation();

      removeHoveredOverHighlight();

      // Get the type of dropped element and act on it
      if (!currentlyDragged) {
        // eslint-disable-next-line no-console
        console.error("No dragged node in context but a drop was detected...");
        return;
      }

      if (canAcceptDrop) {
        onDrop(currentlyDragged);
      } else {
        // eslint-disable-next-line no-console
        console.error("Incompatable drag pairing");
      }

      // Turn off drag
      unsetCurrentlyDragged();
    },
    [
      canAcceptDrop,
      currentlyDragged,
      onDrop,
      removeHoveredOverHighlight,
      unsetCurrentlyDragged,
    ]
  );

  React.useEffect(() => {
    const watcherEl = watcherRef.current;
    if (!watcherEl) return;

    if (canAcceptDrop) {
      addCanAcceptDropHighlight();

      watcherEl.addEventListener("dragenter", handleDragOver);
      watcherEl.addEventListener("dragleave", handleDragLeave);
      watcherEl.addEventListener("dragover", handleDragOver);
      watcherEl.addEventListener("drop", handleDrop);
    }

    return () => {
      removeAllHighlights();

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

  return watcherRef;
}

function useDropHighlights({
  watcherRef,
  canAcceptDropClass,
  hoveringOverClass,
}: {
  watcherRef: React.RefObject<HTMLDivElement>;
  canAcceptDropClass: string;
  hoveringOverClass: string;
}) {
  const addCanAcceptDropHighlight = React.useCallback(() => {
    if (!watcherRef.current) return;
    watcherRef.current.classList.add(canAcceptDropClass);
    watcherRef.current.classList.add("can-accept-drop");
  }, [canAcceptDropClass, watcherRef]);

  const addHoveredOverHighlight = React.useCallback(() => {
    if (!watcherRef.current) return;

    watcherRef.current.classList.add(hoveringOverClass);
  }, [hoveringOverClass, watcherRef]);

  const removeHoveredOverHighlight = React.useCallback(() => {
    if (!watcherRef.current) return;

    watcherRef.current.classList.remove(hoveringOverClass);
  }, [hoveringOverClass, watcherRef]);

  const removeAllHighlights = React.useCallback(() => {
    if (!watcherRef.current) return;

    watcherRef.current.classList.remove(hoveringOverClass);
    watcherRef.current.classList.remove(canAcceptDropClass);
    watcherRef.current.classList.remove("can-accept-drop");
  }, [canAcceptDropClass, hoveringOverClass, watcherRef]);

  return {
    addCanAcceptDropHighlight,
    addHoveredOverHighlight,
    removeHoveredOverHighlight,
    removeAllHighlights,
  };
}
