import clone from "just-clone";
import React from "react";
import { getExtentsForAvailableTracts } from "utils/gridTemplates/availableCellsForItem";
import { centersOfAvailableBlocks } from "utils/gridTemplates/moveCandidatesForItem";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";
import {
  centerOfBounds,
  clamp,
  GridItemExtent,
  gridLocationToBounds,
  gridLocationToExtent,
} from "./helpers";
import { GridCellBounds } from "./index";

type ItemBounds = ReturnType<typeof gridLocationToBounds>;

export type DragDirection = "left" | "right" | "up" | "down";

type DragInfo =
  | {
      type: "resize";
      dragDirection: DragDirection;
      dragBounds: ItemBounds;
      gridItemExtent: GridItemExtent;
      startingBounds: ItemBounds;
      tractExtents: ReturnType<typeof getExtentsForAvailableTracts>;
    }
  | {
      type: "move";
      availableMoves: ReturnType<typeof centersOfAvailableBlocks>;
      currentPos: { x: number; y: number };
      gridItemExtent: GridItemExtent;
    };

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
    (e: MouseEvent) => {
      const { x, y } = e;
      if (!dragRef.current || !overlayRef.current)
        throw new Error(
          "For some reason we are observing dragging when we shouldn't"
        );
      if (dragRef.current.type === "move") {
        console.log({ x, y });
        return;
      }

      const {
        dragDirection,
        dragBounds,
        startingBounds,
        tractExtents,
        gridItemExtent,
      } = dragRef.current;

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

      placeItemOnGrid(overlayRef.current, gridItemExtent);
      placeItemAbsolutely(overlayRef.current, dragBounds);
    },
    [overlayRef]
  );

  const endDrag = React.useCallback(() => {
    const overlayEl = overlayRef.current;
    if (!overlayEl) return;

    if (dragRef.current?.gridItemExtent) {
      // TODO also check if the position has actually changed to avoid unneeded
      // refires.
      onDragEnd(dragRef.current.gridItemExtent);
    }
    overlayEl.classList.remove("dragging");
    document.removeEventListener("mousemove", onDrag);
  }, [onDrag, onDragEnd, overlayRef]);

  const startDrag = React.useCallback(
    (dragDirection: DragDirection | "move") => {
      const overlayEl = overlayRef.current;
      if (!overlayEl) return;

      const itemBounds = gridLocationToBounds({ cellBounds, gridLocation });

      if (dragDirection === "move") {
        console.log("Moving item", initialGridExtent);

        dragRef.current = {
          type: "move",
          availableMoves: centersOfAvailableBlocks({
            ...gridLocation,
            layoutAreas,
            cellBounds,
          }),
          currentPos: centerOfBounds(itemBounds),
          gridItemExtent: initialGridExtent,
        };
      } else {
        dragRef.current = {
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

      overlayEl.classList.add("dragging");

      placeItemOnGrid(overlayRef.current, dragRef.current.gridItemExtent);
      placeItemAbsolutely(overlayEl, itemBounds);

      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", endDrag, { once: true });
    },
    [
      cellBounds,
      endDrag,
      gridLocation,
      initialGridExtent,
      layoutAreas,
      onDrag,
      overlayRef,
    ]
  );

  return startDrag;
}

function placeItemAbsolutely(el: HTMLDivElement, bounds: ItemBounds) {
  el.style.setProperty("--drag-top", bounds.top + "px");
  el.style.setProperty("--drag-left", bounds.left + "px");
  el.style.setProperty("--drag-width", bounds.right - bounds.left + "px");
  el.style.setProperty("--drag-height", bounds.bottom - bounds.top + "px");
}

function placeItemOnGrid(
  el: HTMLDivElement,
  { rowStart, rowEnd, colStart, colEnd }: GridItemExtent
) {
  el.style.setProperty("--drag-grid-row-start", String(rowStart));
  el.style.setProperty("--drag-grid-row-end", String(rowEnd + 1));
  el.style.setProperty("--drag-grid-column-start", String(colStart));
  el.style.setProperty("--drag-grid-column-end", String(colEnd + 1));
}
