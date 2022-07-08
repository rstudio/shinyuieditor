import React from "react";

import type { CSSMeasure } from "CSSMeasure";

import type { TemplatedGridProps, TractDirection } from "..";

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
  startDrag: TractEventListener;
};

export function useDragToResizeGrid({
  containerRef,
  onDragEnd,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  onDragEnd?: (layout: TemplatedGridProps) => void;
}): TractEventListener {
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

      const { beforeIndex, afterIndex } = dragState;

      const dragWatcherDiv = setupDragWatcherDiv(container, dragState.dir);
      const beforeSizeDisplay = setupSizeFeedbackDisplay(container, {
        dir,
        index: beforeIndex,
        size: dragState.currentSizes[beforeIndex] as CSSMeasure,
      });
      const afterSizeDisplay = setupSizeFeedbackDisplay(container, {
        dir,
        index: afterIndex,
        size: dragState.currentSizes[afterIndex] as CSSMeasure,
      });

      dragWatcherDiv.addEventListener("mousemove", (e: MouseEvent) => {
        updateDragState({
          mousePosition: e,
          drag: dragState,
          container: validateDragContainer(containerRef.current),
        });

        beforeSizeDisplay.update(dragState.currentSizes[beforeIndex]);
        afterSizeDisplay.update(dragState.currentSizes[afterIndex]);
      });

      const finishDrag = () => {
        teardownDragWatcherDiv(dragWatcherDiv);
        beforeSizeDisplay.remove();
        afterSizeDisplay.remove();

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
      };

      // Lifting mouse click up or dragging off the window will finish the
      // resize event
      dragWatcherDiv.addEventListener("mouseup", finishDrag);
      dragWatcherDiv.addEventListener("mouseleave", finishDrag);
    },
    [containerRef, onDragEnd]
  );

  return startDrag;
}

function setupSizeFeedbackDisplay(
  container: HTMLDivElement,
  { dir, index, size }: TractInfo
) {
  const containingDiv = document.createElement("div");

  const positionStyles =
    dir === "rows"
      ? {
          gridRow: String(index + 1),
          gridColumn: "1",
          flexDirection: "row",
        }
      : {
          gridColumn: String(index + 1),
          gridRow: "1",
          flexDirection: "column",
        };
  Object.assign(containingDiv.style, positionStyles, {
    zIndex: "1",
    display: "flex",
    alignItems: "center",
  });

  const displayDiv = document.createElement("div");
  Object.assign(displayDiv.style, {
    padding: "3px 7px",
    borderRadius: "var(--corner-radius)",
    backgroundColor: "var(--light-grey, pink)",
  });
  displayDiv.innerHTML = size;

  containingDiv.appendChild(displayDiv);
  container.appendChild(containingDiv);

  return {
    remove: () => containingDiv.remove(),
    update: (size: string) => {
      displayDiv.innerHTML = size;
    },
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
