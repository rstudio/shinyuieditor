import React from "react";

import type { CSSMeasure } from "CSSMeasure";

import type { TemplatedGridProps, TractDirection } from "..";

import type { DragState } from "./dragToResizeHelpers";
import { initDragState, updateDragState } from "./dragToResizeHelpers";
import { getLayoutFromGridElement } from "./utils";

export type TractInfo = {
  dir: TractDirection;
  index: number;
  size: CSSMeasure;
};

type ActiveDragStatus = {
  status: "hovering" | "dragging";
  dir: TractDirection;
  tracts: [TractInfo, TractInfo];
};
export type DragStatus =
  | {
      status: "idle";
    }
  | ActiveDragStatus;

export type TractEventListener = (x: {
  e: React.MouseEvent;
  dir: TractDirection;
  index: number;
}) => void;

export type TractEventListeners = {
  onTractHover: TractEventListener;
  startDrag: TractEventListener;
  onTractMouseOut: () => void;
};

export function useDragToResizeGrid({
  containerRef,
  onDragEnd,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  onDragEnd?: (layout: TemplatedGridProps) => void;
}): TractEventListeners & { dragStatus: DragStatus } {
  const [dragStatus, setDragStatus] = React.useState<DragStatus>({
    status: "idle",
  });
  const dragWatcherDivRef = React.useRef<HTMLDivElement | null>(null);
  const dragStateRef = React.useRef<DragState | null>(null);

  const onTractHover: TractEventListener = React.useCallback(
    ({
      e,
      dir,
      index,
    }: {
      e: React.MouseEvent;
      dir: TractDirection;
      index: number;
    }) => {
      const container = validateDragContainer(containerRef.current);

      // If we're already dragging, don't try to start another drag.
      if (dragStateRef.current) {
        return;
      }

      setDragStatus(
        dragStateToStatus(
          initDragState({
            mousePosition: e,
            dir,
            index,
            container,
          }),
          "hovering"
        )
      );
    },
    [containerRef]
  );

  const onTractMouseOut = React.useCallback(() => {
    // If we've transitioned from hovering to dragging, don't do anything.
    if (dragStateRef.current) {
      return;
    }
    setDragStatus({ status: "idle" });
  }, []);

  const onMouseMove = React.useCallback(
    (e: MouseEvent) => {
      const dragState = validateDragState(dragStateRef.current);
      updateDragState({
        mousePosition: e,
        drag: dragState,
        container: validateDragContainer(containerRef.current),
      });

      setDragStatus(dragStateToStatus(dragState, "dragging"));
    },
    [containerRef, dragStateRef]
  );

  const finishDrag = React.useCallback(() => {
    teardownDragWatcherDiv(dragWatcherDivRef.current);

    // Get the final sizes after dragging
    // TODO: Update the javascript arrays containing the sizes to remove
    // reliance on node state for sizing
    if (onDragEnd) {
      onDragEnd(
        getLayoutFromGridElement(validateDragContainer(containerRef.current))
      );
    }
    setDragStatus({ status: "idle" });
    dragStateRef.current = null;
  }, [containerRef, onDragEnd]);

  const startDrag = React.useCallback(
    ({
      e,
      dir,
      index,
    }: {
      e: React.MouseEvent;
      dir: TractDirection;
      index: number;
    }) => {
      const container = validateDragContainer(containerRef.current);

      // This prevents the mouse down from triggering un-desired things like text-selection etc.
      e.preventDefault();

      dragStateRef.current = initDragState({
        mousePosition: e,
        dir,
        index,
        container,
      });

      setDragStatus(dragStateToStatus(dragStateRef.current, "dragging"));

      const dragWatcherDiv = setupDragWatcherDiv(
        container,
        dragStateRef.current.dir
      );

      dragWatcherDivRef.current = dragWatcherDiv;
      dragWatcherDiv.addEventListener("mousemove", onMouseMove);

      // Lifting mouse click up or dragging off the window will finish the
      // resize event
      dragWatcherDiv.addEventListener("mouseup", finishDrag);
      dragWatcherDiv.addEventListener("mouseleave", finishDrag);
    },
    [containerRef, finishDrag, onMouseMove]
  );

  return {
    dragStatus,
    startDrag,
    onTractHover,
    onTractMouseOut,
  };
}

function dragStateToStatus(
  dragState: DragState,
  status: ActiveDragStatus["status"]
): DragStatus {
  const { dir, afterIndex, beforeIndex, currentSizes } = dragState;

  return {
    status,
    dir,
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

function setupDragWatcherDiv(
  container: HTMLDivElement,
  dragDir: TractDirection
) {
  // Make a big div that covers the screen to listen for the rest of the mouse commands
  const dragWatcherDiv = document.createElement("div");
  dragWatcherDiv.style.position = "fixed";
  dragWatcherDiv.style.inset = "0px";
  dragWatcherDiv.style.zIndex = "3";
  // Keep the cursor consistant with the appropriate direction resizer to let
  // the user know they're in "drag mode"
  dragWatcherDiv.style.cursor = dragDir === "rows" ? "ns-resize" : "ew-resize";

  container.appendChild(dragWatcherDiv);

  return dragWatcherDiv;
}

function teardownDragWatcherDiv(dragWatcherDiv: HTMLDivElement | null) {
  if (!dragWatcherDiv) {
    throw new Error("Can't find div used to watch for drag...");
  }

  // Remove event listeners before removing div. Probably not neccesary but
  // better safe than sorry
  dragWatcherDiv.onmousemove = null;
  dragWatcherDiv.onmouseup = null;
  dragWatcherDiv.onmouseleave = null;
  dragWatcherDiv.remove();
}

function validateDragContainer(
  container: HTMLDivElement | null
): HTMLDivElement {
  if (!container) {
    throw new Error("How are you dragging on an element without a container?");
  }
  return container;
}

function validateDragState(dragState: DragState | null): DragState {
  if (!dragState) {
    throw new Error("Mouse up detected without any current drag state.");
  }
  return dragState;
}
