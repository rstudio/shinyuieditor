import React from "react";

import clone from "just-clone";
import { getExtentsForAvailableTracts } from "utils/gridTemplates/getExtentsForAvailableTracts";
import type { AvailableBlocks } from "utils/gridTemplates/moveCandidatesForItem";
import {
  centersOfAvailableBlocks,
  findClosestAvailableBlock,
  sameLocation,
} from "utils/gridTemplates/moveCandidatesForItem";
import type { GridItemExtent, ItemLocation } from "utils/gridTemplates/types";
import type { SelectionRect } from "utils/overlap-helpers";

import type { TemplatedGridProps } from ".";

import type { GridCellBounds } from "./GridCell";
import {
  centerOfBounds,
  clamp,
  gridLocationToBounds,
  gridLocationToExtent,
} from "./helpers";

type ItemBounds = ReturnType<typeof gridLocationToBounds>;

export type DragDirection = "left" | "right" | "up" | "down";

type ResizeDragState = {
  type: "resize";
  dragDirection: DragDirection;
  dragBounds: ItemBounds;
  gridItemExtent: GridItemExtent;
  startingBounds: ItemBounds;
  tractExtents: ReturnType<typeof getExtentsForAvailableTracts>;
};

type MoveDragState = {
  type: "move";
  availableBlocks: AvailableBlocks;
  currentPos: { x: number; y: number };
  gridItemExtent: GridItemExtent;
};

type DragInfo = ResizeDragState | MoveDragState;

function setupDragToMove({
  itemBounds,
  cellBounds,
  gridLocation,
  layoutAreas,
}: {
  cellBounds: GridCellBounds;
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
  itemBounds: SelectionRect;
}): MoveDragState {
  return {
    type: "move",
    availableBlocks: centersOfAvailableBlocks({
      itemLoc: gridLocation,
      layoutAreas,
      cellBounds,
    }),
    currentPos: centerOfBounds(itemBounds),
    gridItemExtent: gridLocationToExtent(gridLocation),
  };
}

function moveOnDrag({
  mousePos,
  dragState,
}: {
  mousePos: { x: number; y: number };
  dragState: MoveDragState;
}) {
  const { availableBlocks, gridItemExtent } = dragState;

  const currentClosest = findClosestAvailableBlock(mousePos, availableBlocks);

  if (sameLocation(currentClosest, gridItemExtent)) return;

  dragState.gridItemExtent = gridLocationToExtent(currentClosest);
  return dragState.gridItemExtent;
  // placeItemOnGrid(overlayEl, dragState.gridItemExtent);
}

function setupDragToResize({
  itemBounds,
  dragDirection,
  cellBounds,
  gridLocation,
  layoutAreas,
}: {
  itemBounds: SelectionRect;
  dragDirection: DragDirection;
  cellBounds: GridCellBounds;
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
}): ResizeDragState {
  return {
    type: "resize",
    dragDirection,
    startingBounds: clone(itemBounds),
    dragBounds: itemBounds,
    gridItemExtent: gridLocationToExtent(gridLocation),
    tractExtents: getExtentsForAvailableTracts({
      dragDirection,
      gridLocation,
      layoutAreas,
      cellBounds,
    }),
  };
}

function resizeOnDrag({
  mousePos: { x, y },
  dragState,
}: {
  mousePos: { x: number; y: number };
  dragState: ResizeDragState;
}) {
  const {
    dragDirection,
    dragBounds,
    startingBounds,
    tractExtents,
    gridItemExtent,
  } = dragState;

  const expansionLimit = tractExtents.maxExtent;
  const furthestIndex =
    tractExtents.extents[tractExtents.extents.length - 1].index;

  // These are the directions where expanding will mean increasing
  // the tract index
  const growing = dragDirection === "right" || dragDirection === "down";
  const firstTractAfterBounds = (newBounds: number) => {
    for (let tract of tractExtents.extents) {
      if (growing && newBounds <= tract.start) return tract.index - 1;
      if (!growing && newBounds >= tract.start) return tract.index + 1;
    }
    return furthestIndex;
  };

  // Number of pixels added to prevent inversion of drag box
  const buffer = 2;
  switch (dragDirection) {
    case "right":
      dragBounds.right = clamp({
        min: startingBounds.left + buffer,
        val: x,
        max: expansionLimit,
      });
      gridItemExtent.colEnd = firstTractAfterBounds(dragBounds.right);
      break;

    case "down":
      dragBounds.bottom = clamp({
        min: startingBounds.top + buffer,
        val: y,
        max: expansionLimit,
      });
      gridItemExtent.rowEnd = firstTractAfterBounds(dragBounds.bottom);
      break;

    case "left":
      dragBounds.left = clamp({
        min: expansionLimit,
        val: x,
        max: startingBounds.right - buffer,
      });
      gridItemExtent.colStart = firstTractAfterBounds(dragBounds.left);

      break;

    case "up":
      dragBounds.top = clamp({
        min: expansionLimit,
        val: y,
        max: startingBounds.bottom - buffer,
      });
      gridItemExtent.rowStart = firstTractAfterBounds(dragBounds.top);
      break;
  }

  return gridItemExtent;

  // placeItemOnGrid(overlayEl, gridItemExtent);
  // placeItemAbsolutely(overlayEl, dragBounds);
}

export function useResizeOnDrag({
  overlayRef,
  cellBounds,
  gridLocation,
  layoutAreas,
  onDragEnd,
}: {
  overlayRef: React.RefObject<HTMLDivElement>;
  cellBounds: GridCellBounds;
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
  onDragEnd: (pos: GridItemExtent) => void;
}) {
  const initialGridExtent = gridLocationToExtent(gridLocation);
  const dragRef = React.useRef<DragInfo | null>(null);

  const onDrag = React.useCallback(
    (mousePos: MouseEvent) => {
      const overlayEl = overlayRef.current;
      const dragState = dragRef.current;
      if (!overlayEl || !dragState) {
        throw new Error(
          "For some reason we are observing dragging when we shouldn't"
        );
      }

      const newGridPosition =
        dragState.type === "move"
          ? moveOnDrag({ mousePos, dragState })
          : resizeOnDrag({ mousePos, dragState });

      if (newGridPosition) placeItemOnGrid(overlayEl, newGridPosition);
    },
    [overlayRef]
  );

  const endDrag = React.useCallback(() => {
    const overlayEl = overlayRef.current;
    const dragState = dragRef.current;
    if (!overlayEl || !dragState) return;

    // Fire the end location function as long as the item location has changed
    const finalGridExtent = dragState.gridItemExtent;
    if (!sameLocation(finalGridExtent, initialGridExtent)) {
      onDragEnd(finalGridExtent);
    }

    // Return positioning logic to the grid-area method
    overlayEl.classList.remove("dragging");
    document.removeEventListener("mousemove", onDrag);
    toggleTextSelection("on");
  }, [initialGridExtent, onDrag, onDragEnd, overlayRef]);

  const startDrag = React.useCallback(
    (dragDirection: DragDirection | "move") => {
      const overlayEl = overlayRef.current;
      if (!overlayEl) return;

      const itemBounds = gridLocationToBounds({ cellBounds, gridLocation });

      dragRef.current =
        dragDirection === "move"
          ? setupDragToMove({
              itemBounds,
              cellBounds,
              gridLocation,
              layoutAreas,
            })
          : setupDragToResize({
              dragDirection,
              itemBounds,
              cellBounds,
              gridLocation,
              layoutAreas,
            });

      // Add explicite positioning to grid item div and then turn on drag
      // mode to transfer placement duties to those positions
      placeItemOnGrid(overlayRef.current, dragRef.current.gridItemExtent);
      overlayEl.classList.add("dragging");

      // Setup event listeners for the next steps
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", endDrag, { once: true });
      toggleTextSelection("off");
    },
    [cellBounds, endDrag, gridLocation, layoutAreas, onDrag, overlayRef]
  );

  return startDrag;
}

function toggleTextSelection(type: "on" | "off") {
  // Turnoff text selection so dragging doesnt highlight a bunch of stuff
  const bodyClasses = document.querySelector("body")?.classList;
  if (type === "off") {
    bodyClasses?.add("disable-text-selection");
  } else {
    bodyClasses?.remove("disable-text-selection");
  }
}

// function placeItemAbsolutely(el: HTMLDivElement, bounds: ItemBounds) {
//   el.style.setProperty("--drag-top", bounds.top + "px");
//   el.style.setProperty("--drag-left", bounds.left + "px");
//   el.style.setProperty("--drag-width", bounds.right - bounds.left + "px");
//   el.style.setProperty("--drag-height", bounds.bottom - bounds.top + "px");
// }

function placeItemOnGrid(
  el: HTMLDivElement,
  { rowStart, rowEnd, colStart, colEnd }: GridItemExtent
) {
  el.style.setProperty("--drag-grid-row-start", String(rowStart));
  el.style.setProperty("--drag-grid-row-end", String(rowEnd + 1));
  el.style.setProperty("--drag-grid-column-start", String(colStart));
  el.style.setProperty("--drag-grid-column-end", String(colEnd + 1));
}
