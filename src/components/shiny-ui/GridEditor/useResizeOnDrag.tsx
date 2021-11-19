import clone from "just-clone";
import React from "react";
import { getExtentsForAvailableTracts } from "utils/gridTemplates/availableCellsForItem";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";
import { MovementType } from "./availableMoves";
import {
  clamp,
  GridItemExtent,
  gridLocationToBounds,
  gridLocationToExtent,
} from "./helpers";
import { GridCellBounds } from "./index";

type ItemBounds = ReturnType<typeof gridLocationToBounds>;

type DragInfo = {
  movementType: MovementType;
  dragBounds: ItemBounds;
  gridItemExtent: GridItemExtent;
  startingBounds: ItemBounds;
  tractExtents: ReturnType<typeof getExtentsForAvailableTracts>;
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

      const {
        movementType,
        dragBounds,
        startingBounds,
        tractExtents,
        gridItemExtent,
      } = dragRef.current;

      const expansionLimit = tractExtents.maxExtent;

      const insideTract = (tractStart: number, bounds: number) =>
        movementType === "expand right" || movementType === "expand down"
          ? tractStart < bounds
          : tractStart > bounds;

      const firstTractAfterBounds = (newBounds: number) =>
        tractExtents.extents.find(({ start }) => insideTract(start, newBounds))
          ?.index;

      let newGridExtent: number | undefined;
      switch (movementType) {
        case "expand right":
          dragBounds.right = clamp({
            min: startingBounds.right,
            val: x,
            max: expansionLimit,
          });

          gridItemExtent.colEnd =
            firstTractAfterBounds(dragBounds.right) ?? initialGridExtent.colEnd;

          break;
        case "expand left":
          dragBounds.left = clamp({
            max: startingBounds.left,
            val: x,
            min: expansionLimit,
          });

          gridItemExtent.colStart =
            firstTractAfterBounds(dragBounds.left) ??
            initialGridExtent.colStart;

          break;
        case "expand down":
          dragBounds.bottom = clamp({
            min: startingBounds.bottom,
            val: y,
            max: expansionLimit,
          });
          gridItemExtent.rowEnd =
            firstTractAfterBounds(dragBounds.bottom) ??
            initialGridExtent.rowEnd;

          break;
        case "expand up":
          dragBounds.top = clamp({
            min: expansionLimit,
            val: y,
            max: startingBounds.top,
          });
          gridItemExtent.rowStart =
            firstTractAfterBounds(dragBounds.top) ?? initialGridExtent.rowStart;
          break;
        default:
          console.log("have yet to implement", movementType);
      }

      placeItemOnGrid(overlayRef.current, gridItemExtent);
      placeItemAbsolutely(overlayRef.current, dragBounds);
    },
    [
      initialGridExtent.colEnd,
      initialGridExtent.colStart,
      initialGridExtent.rowEnd,
      initialGridExtent.rowStart,
      overlayRef,
    ]
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
    (movementType: MovementType) => {
      const overlayEl = overlayRef.current;
      if (!overlayEl) return;

      const itemBounds = gridLocationToBounds({ cellBounds, gridLocation });

      dragRef.current = {
        movementType,
        startingBounds: clone(itemBounds),
        dragBounds: itemBounds,
        gridItemExtent: gridLocationToExtent(gridLocation),
        tractExtents: getExtentsForAvailableTracts({
          side: movementType,
          gridLocation,
          layoutAreas,
          cellBounds,
        }),
      };

      overlayEl.classList.add("dragging");

      placeItemOnGrid(overlayRef.current, dragRef.current.gridItemExtent);
      placeItemAbsolutely(overlayEl, itemBounds);

      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", endDrag, { once: true });
    },
    [cellBounds, endDrag, gridLocation, layoutAreas, onDrag, overlayRef]
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
