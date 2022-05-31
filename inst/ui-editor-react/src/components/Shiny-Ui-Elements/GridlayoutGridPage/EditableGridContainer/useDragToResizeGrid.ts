import React from "react";

import type { CSSMeasure } from "CSSMeasure";

import type { TemplatedGridProps } from "..";

import type { DragState } from "./dragToResizeHelpers";
import { initDragState, updateDragState } from "./dragToResizeHelpers";
import { getLayoutFromGridElement } from "./utils";

type TractDir = "rows" | "columns";
export type TractInfo = {
  dir: TractDir;
  index: number;
  size: CSSMeasure;
};
type DragStatus =
  | {
      status: "idle";
    }
  | {
      status: "dragging";
      tracts: [TractInfo, TractInfo];
    };

export function useDragToResizeGrid({
  containerRef,
  onDragEnd,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  onDragEnd?: (layout: TemplatedGridProps) => void;
}) {
  const [dragStatus, setDragStatus] = React.useState<DragStatus>({
    status: "idle",
  });

  const dragStateRef = React.useRef<DragState | null>(null);

  const startDrag = React.useCallback(
    ({
      e,
      dir,
      index,
    }: {
      e: React.MouseEvent;
      dir: TractDir;
      index: number;
    }) => {
      if (!containerRef.current) {
        console.error(
          "How are you dragging on an element without a container?"
        );
        return;
      }

      // If we're already dragging, don't try to start another drag.
      if (dragStateRef.current) {
        return;
      }

      // This prevents the mouse down from triggering un-desired things like text-selection etc.
      e.preventDefault();

      dragStateRef.current = initDragState({
        mousePosition: e,
        dir,
        index,
        container: containerRef.current,
      });

      setDragStatus(dragStateToStatus(dragStateRef.current));
      startListeningForMouseMove();
    },
    [containerRef]
  );

  const onMouseMove = React.useCallback(
    (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) {
        console.error(
          "How are you dragging on an element without a container?"
        );
        return;
      }

      const dragState = dragStateRef.current;

      if (!dragState) {
        console.error("Mouse move detected without any current drag state.");
        return;
      }

      updateDragState({
        mousePosition: e,
        drag: dragState,
        container,
      });

      setDragStatus(dragStateToStatus(dragState));
    },
    [containerRef, dragStateRef]
  );

  const finishDrag = React.useCallback(() => {
    if (!dragStateRef.current) {
      console.error("Mouse up detected without any current drag state.");
      return;
    }
    const container = containerRef.current;
    if (!container) {
      console.error("How are you dragging on an element without a container?");
      return;
    }

    // TODO: Update the javascript arrays containing the sizes to remove
    // reliance on node state for sizing
    stopListeningForMouseMove();

    // Get the final sizes after dragging
    if (onDragEnd) {
      onDragEnd(getLayoutFromGridElement(container));
    }
    setDragStatus({ status: "idle" });
    dragStateRef.current = null;
  }, [containerRef, onDragEnd]);

  const dragWatcherDivRef = React.useRef<HTMLDivElement | null>(null);

  const startListeningForMouseMove = React.useCallback(() => {
    const container = containerRef.current;

    if (!container) {
      console.error("How are you dragging on an element without a container?");
      return;
    }
    // Make a big div that covers the screen to listen for the rest of the mouse commands
    const dragWatcherDiv = document.createElement("div");
    dragWatcherDiv.style.position = "fixed";
    dragWatcherDiv.style.inset = "0px";
    dragWatcherDiv.style.opacity = "0";
    // Keep the cursor consistant with the appropriate direction resizer to let
    // the user know they're in "drag mode"
    dragWatcherDiv.style.cursor =
      dragStateRef.current?.dir === "rows" ? "ns-resize" : "ew-resize";

    dragWatcherDivRef.current = dragWatcherDiv;
    container.appendChild(dragWatcherDiv);
    dragWatcherDiv.addEventListener("mousemove", onMouseMove);

    // Lifting mouse click up or dragging off the window will finish the resize
    // event
    dragWatcherDiv.addEventListener("mouseup", finishDrag);
    dragWatcherDiv.addEventListener("mouseleave", finishDrag);
  }, [onMouseMove]);

  const stopListeningForMouseMove = React.useCallback(() => {
    const container = containerRef.current;

    if (!container) {
      console.error("How are you dragging on an element without a container?");
      return;
    }
    const dragWatcherDiv = dragWatcherDivRef.current;
    if (!dragWatcherDiv) {
      throw new Error("Can't find div used to watch for drag...");
    }
    dragWatcherDiv.removeEventListener("mousemove", onMouseMove);
    dragWatcherDiv.removeEventListener("mouseup", finishDrag);
    dragWatcherDiv.removeEventListener("mouseleave", finishDrag);
    dragWatcherDiv.remove();
    dragWatcherDivRef.current = null;
  }, [onMouseMove]);

  return {
    dragStatus,
    startDrag,
  };
}

function dragStateToStatus(dragState: DragState): DragStatus {
  const { dir, afterIndex, beforeIndex, currentSizes } = dragState;

  return {
    status: "dragging",
    tracts: [
      {
        dir,
        index: beforeIndex,
        size: currentSizes[beforeIndex] as CSSMeasure,
      },
      { dir, index: afterIndex, size: currentSizes[afterIndex] as CSSMeasure },
    ],
  };
}
