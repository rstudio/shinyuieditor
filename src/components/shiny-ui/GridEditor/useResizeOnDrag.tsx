import clone from "just-clone";
import React from "react";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";
import { expansionRoom, MovementType } from "./availableMoves";
import { clamp, gridLocationToBounds } from "./helpers";
import { GridCellBounds } from "./index";

type ItemBounds = ReturnType<typeof gridLocationToBounds>;

export type DragInfo = {
  movementType: MovementType;
  dragBounds: ItemBounds;
  startingBounds: ItemBounds;
  expansionLimit?: number;
};
export function useResizeOnDrag({
  overlayRef,
  cellBounds,
  gridLocation,
  layoutAreas,
}: {
  overlayRef: React.RefObject<HTMLDivElement>;
  cellBounds: GridCellBounds;
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
}) {
  const dragRef = React.useRef<DragInfo | null>(null);

  const onDrag = React.useCallback(
    (e: MouseEvent) => {
      const { x, y } = e;
      if (!dragRef.current || !overlayRef.current)
        throw new Error(
          "For some reason we are observing dragging when we shouldn't"
        );

      const movementType = dragRef.current.movementType;
      const { dragBounds, startingBounds, expansionLimit } = dragRef.current;

      switch (movementType) {
        case "expand right":
          dragBounds.right = clamp({
            min: startingBounds.right,
            val: x,
            max: expansionLimit,
          });
          break;
        case "expand left":
          dragBounds.left = clamp({
            max: startingBounds.left,
            val: x,
            min: expansionLimit,
          });

          break;
        case "expand down":
          dragBounds.bottom = clamp({
            min: startingBounds.bottom,
            val: y,
            max: expansionLimit,
          });

          break;
        case "expand up":
          dragBounds.top = clamp({
            min: expansionLimit,
            val: y,
            max: startingBounds.top,
          });
          break;
        default:
          console.log("have yet to implement", movementType);
      }

      placeItemAbsolutely(overlayRef.current, dragBounds);
    },
    [overlayRef]
  );

  const endDrag = React.useCallback(() => {
    const overlayEl = overlayRef.current;
    if (!overlayEl) return;
    console.log("Ending drag");
    overlayEl.classList.remove("dragging");

    document.removeEventListener("mousemove", onDrag);
  }, [onDrag, overlayRef]);

  const startDrag = React.useCallback(
    (movementType: MovementType) => {
      const overlayEl = overlayRef.current;
      if (!overlayEl) return;

      const itemBounds = gridLocationToBounds({ cellBounds, gridLocation });
      const maxExpansion = expansionRoom({
        side: movementType,
        gridLocation,
        layoutAreas,
        cellBounds,
      });
      dragRef.current = {
        movementType,
        startingBounds: clone(itemBounds),
        dragBounds: itemBounds,
        expansionLimit: maxExpansion,
      };

      overlayEl.classList.add("dragging");
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
