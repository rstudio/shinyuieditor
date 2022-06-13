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

import type { TemplatedGridProps, TractDirection } from ".";

import type { GridCellBounds } from "./GridCell";
import {
  centerOfBounds,
  clamp,
  gridLocationToBounds,
  gridLocationToExtent,
} from "./helpers";
import type { TractExtents } from "./TractExtents";
import { within } from "./TractExtents";
import { getTractExtents } from "./TractExtents";

type ItemBounds = ReturnType<typeof gridLocationToBounds>;

export type DragHandle = "left" | "right" | "up" | "down";

type ResizeDragState = {
  type: "resize";
  dragHandle: DragHandle;
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
  tractExtents,
  gridLocation,
  layoutAreas,
}: {
  itemBounds: SelectionRect;
  dragDirection: DragHandle;
  cellBounds: GridCellBounds;
  tractExtents: TractExtents;
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
}): ResizeDragState {
  return {
    type: "resize",
    dragHandle: dragDirection,
    startingBounds: clone(itemBounds),
    dragBounds: itemBounds,
    gridItemExtent: gridLocationToExtent(gridLocation),
    tractExtents: getExtentsForAvailableTracts({
      dragDirection,
      tractExtents,
      gridLocation,
      layoutAreas,
      cellBounds,
    }),
  };
}

function resizeOnDrag({
  mousePos,
  dragState,
}: {
  mousePos: { x: number; y: number };
  dragState: ResizeDragState;
}) {
  const {
    dragHandle,
    dragBounds,
    startingBounds,
    tractExtents,
    gridItemExtent,
  } = dragState;

  // Find out which tract our drag is sitting in currently
  const drag_position =
    mousePos[dragHandle === "down" || dragHandle === "up" ? "y" : "x"];

  const containing_tract = tractExtents.find(({ start, end }) =>
    within(drag_position, start, end)
  );

  if (containing_tract === undefined) {
    console.log("Gone beyond extent of available drag. ending early");
    return;
  }

  console.log("contained in", containing_tract?.index);

  // Number of pixels added to prevent inversion of drag box
  const buffer = 2;

  switch (dragHandle) {
    case "right":
      gridItemExtent.colEnd = containing_tract.index;
      break;
    case "left":
      // dragBounds.left = clamp({
      //   min: expansionLimit,
      //   val: x,
      //   max: startingBounds.right - buffer,
      // });
      gridItemExtent.colStart = containing_tract.index;

      break;

    case "down":
      // dragBounds.bottom = clamp({
      //   min: startingBounds.top + buffer,
      //   val: y,
      //   max: expansionLimit,
      // });

      gridItemExtent.rowEnd = containing_tract.index;
      break;

    case "up":
      // dragBounds.top = clamp({
      //   min: expansionLimit,
      //   val: y,
      //   max: startingBounds.bottom - buffer,
      // });

      gridItemExtent.rowStart = containing_tract.index;

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
    (dragDirection: DragHandle | "move") => {
      const overlayEl = overlayRef.current;
      if (!overlayEl) return;
      const gridElement = overlayEl.parentElement;
      if (!gridElement) return;

      const gridContainerStyles = getComputedStyle(overlayEl.parentElement);
      const gridContainerBoundingRect = gridElement.getBoundingClientRect();

      const itemBounds = gridLocationToBounds({ cellBounds, gridLocation });
      const tractDir: TractDirection =
        dragDirection === "down" || dragDirection === "up" ? "rows" : "cols";

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
              tractExtents: getTractExtents({
                dir: tractDir,
                gridContainerStyles,
                gridContainerBoundingRect,
              }),
              gridLocation,
              layoutAreas,
            });

      // Add explicit positioning to grid item div and then turn on drag
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

export function getGridTractSizes(
  containerStyles: CSSStyleDeclaration,
  dir: TractDirection
) {
  const tractPxVals = containerStyles
    .getPropertyValue(
      dir === "rows" ? "grid-template-rows" : "grid-template-columns"
    )
    .split(" ");

  return tractPxVals.map(pxValToNumber);
}

export function pxValToNumber(pxVal: string): number {
  return Number(pxVal.replaceAll("px", ""));
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
