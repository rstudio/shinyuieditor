import React from "react";

import type { TractDirection } from "util-functions/src/matrix-helpers";
import { within } from "util-functions/src/within";

import type { DragHandle } from "../../../ui-node-definitions/gridlayout/gridTemplates/findAvailableTracts";
import findAvailableTracts from "../../../ui-node-definitions/gridlayout/gridTemplates/findAvailableTracts";
import {
  gridLocationToExtent,
  sameLocation,
} from "../../../ui-node-definitions/gridlayout/gridTemplates/helpers";
import type { TemplatedGridProps } from "../../../ui-node-definitions/gridlayout/gridTemplates/TemplatedGridProps";
import type {
  GridItemExtent,
  ItemLocation,
} from "../../../ui-node-definitions/gridlayout/gridTemplates/types";

import { getTractExtents } from "./getTractExtents";
import type { TractExtents } from "./getTractExtents";

type ResizeDragState = {
  dragHandle: DragHandle;
  gridItemExtent: GridItemExtent;
  tractExtents: TractExtents;
};

function resizeOnDrag({
  mousePos,
  dragState,
}: {
  mousePos: { x: number; y: number };
  dragState: ResizeDragState;
}) {
  const { dragHandle, tractExtents, gridItemExtent } = dragState;

  // Find out which tract our drag is sitting in currently
  const drag_position =
    mousePos[dragHandle === "down" || dragHandle === "up" ? "y" : "x"];

  const containing_tract = tractExtents.find(({ start, end }) =>
    within(drag_position, start, end)
  );

  if (containing_tract === undefined) {
    return;
  }

  const extentToChange = handleToGridExtent[dragHandle];
  gridItemExtent[extentToChange] = containing_tract.index;

  return gridItemExtent;

  // placeItemOnGrid(overlayEl, gridItemExtent);
  // placeItemAbsolutely(overlayEl, dragBounds);
}

const handleToGridExtent: Record<DragHandle, keyof GridItemExtent> = {
  right: "colEnd",
  left: "colStart",
  up: "rowStart",
  down: "rowEnd",
};

export function useResizeOnDrag({
  overlayRef,
  gridLocation,
  layoutAreas,
  onDragEnd,
}: {
  overlayRef: React.RefObject<HTMLDivElement>;
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
  onDragEnd: (pos: GridItemExtent) => void;
}) {
  const initialGridExtent = gridLocationToExtent(gridLocation);
  const dragRef = React.useRef<ResizeDragState | null>(null);

  const onDrag = React.useCallback(
    (mousePos: MouseEvent) => {
      const overlayEl = overlayRef.current;
      const dragState = dragRef.current;
      if (!overlayEl || !dragState) {
        throw new Error(
          "For some reason we are observing dragging when we shouldn't"
        );
      }

      const newGridPosition = resizeOnDrag({ mousePos, dragState });

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
    (dragDirection: DragHandle) => {
      const overlayEl = overlayRef.current;
      if (!overlayEl) return;
      const gridElement = overlayEl.parentElement;
      if (!gridElement) return;

      const gridContainerStyles = getComputedStyle(overlayEl.parentElement);
      const gridContainerBoundingRect = gridElement.getBoundingClientRect();

      const tractDir: TractDirection =
        dragDirection === "down" || dragDirection === "up" ? "rows" : "cols";

      const { shrinkExtent, growExtent } = findAvailableTracts({
        dragDirection,
        gridLocation,
        layoutAreas,
      });

      dragRef.current = {
        dragHandle: dragDirection,
        gridItemExtent: gridLocationToExtent(gridLocation),
        tractExtents: getTractExtents({
          dir: tractDir,
          gridContainerStyles,
          gridContainerBoundingRect,
        }).filter(({ index }) => within(index, shrinkExtent, growExtent)),
      };

      // Add explicit positioning to grid item div and then turn on drag
      // mode to transfer placement duties to those positions
      placeItemOnGrid(overlayRef.current, dragRef.current.gridItemExtent);
      overlayEl.classList.add("dragging");

      // Setup event listeners for the next steps
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", endDrag, { once: true });
      toggleTextSelection("off");
    },
    [endDrag, gridLocation, layoutAreas, onDrag, overlayRef]
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
