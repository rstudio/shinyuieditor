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
      setDragStatus((currentStatus) => {
        if (currentStatus.status !== "idle") {
          return currentStatus;
        }
        return dragStateToStatus(
          initDragState({
            mousePosition: e,
            dir,
            index,
            container: validateDragContainer(containerRef.current),
          }),
          "hovering"
        );
      });
    },
    [containerRef]
  );

  const onTractMouseOut = React.useCallback(() => {
    setDragStatus((currentStatus) => {
      if (currentStatus.status === "idle") {
        return currentStatus;
      }
      return { status: "idle" };
    });
  }, []);

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

      const dragState = initDragState({
        mousePosition: e,
        dir,
        index,
        container,
      });

      setDragStatus(dragStateToStatus(dragState, "dragging"));

      const dragWatcherDiv = setupDragWatcherDiv(container, dragState.dir);

      dragWatcherDiv.addEventListener("mousemove", (e: MouseEvent) => {
        updateDragState({
          mousePosition: e,
          drag: dragState,
          container: validateDragContainer(containerRef.current),
        });

        setDragStatus(dragStateToStatus(dragState, "dragging"));
      });

      const finishDrag = () => {
        teardownDragWatcherDiv(dragWatcherDiv);

        // Get the final sizes after dragging
        // TODO: Update the javascript arrays containing the sizes to remove
        // reliance on node state for sizing
        if (onDragEnd) {
          onDragEnd(
            getLayoutFromGridElement(
              validateDragContainer(containerRef.current)
            )
          );
        }
        setDragStatus({ status: "idle" });
      };

      // Lifting mouse click up or dragging off the window will finish the
      // resize event
      dragWatcherDiv.addEventListener("mouseup", finishDrag);
      dragWatcherDiv.addEventListener("mouseleave", finishDrag);
    },
    [containerRef, onDragEnd]
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
