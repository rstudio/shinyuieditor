import styled from "@emotion/styled";
import clone from "just-clone";
import React from "react";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";
import {
  availableMoves,
  expansionRoom,
  movementToArrow,
  MovementType,
} from "./availableMoves";
import { clamp, gridLocationToBounds } from "./helpers";
import { CellLocRef } from "./index";

type ItemBounds = ReturnType<typeof gridLocationToBounds>;

type DragInfo = {
  movementType: MovementType;
  dragBounds: ItemBounds;
  startingBounds: ItemBounds;
  expansionLimit?: number;
};

export function AreaOverlay({
  area,
  cellLocRef: { current: cellBounds },
  gridLocation,
  areas: layoutAreas,
}: {
  area: string;
  cellLocRef: CellLocRef;
  gridLocation?: ItemLocation;
  areas: TemplatedGridProps["areas"];
}) {
  if (typeof gridLocation === "undefined")
    throw new Error(`Item in ${area} is not in the location map`);

  const dragRef = React.useRef<DragInfo | null>(null);

  const overlayRef = React.useRef<HTMLDivElement>(null);

  const movementOptions = React.useMemo(
    () => availableMoves({ gridLocation, layoutAreas }),
    [gridLocation, layoutAreas]
  );

  const onDrag = React.useCallback((e: MouseEvent) => {
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
  }, []);

  const endDrag = React.useCallback(() => {
    const overlayEl = overlayRef.current;
    if (!overlayEl) return;
    console.log("Ending drag");
    overlayEl.classList.remove("dragging");

    document.removeEventListener("mousemove", onDrag);
  }, [onDrag]);

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

      console.log({ maxExpansion });

      overlayEl.classList.add("dragging");
      placeItemAbsolutely(overlayEl, itemBounds);
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", endDrag, { once: true });
    },
    [cellBounds, endDrag, gridLocation, layoutAreas, onDrag]
  );

  const movementHandles = React.useMemo(() => {
    let movementArrows: JSX.Element[] = [];

    for (let key in movementOptions) {
      const movementType = key as MovementType;
      if (movementOptions[movementType]) {
        movementArrows.push(
          <Dragger
            key={movementType}
            className={movementType}
            onMouseDown={() => startDrag(movementType)}
          >
            {movementToArrow[movementType]}
          </Dragger>
        );
      }
    }
    return movementArrows;
  }, [movementOptions, startDrag]);

  return (
    <AreaMarker
      ref={overlayRef}
      style={{
        gridArea: area,
      }}
      className="grid-area-overlay"
    >
      {movementHandles}
    </AreaMarker>
  );
}

function placeItemAbsolutely(el: HTMLDivElement, bounds: ItemBounds) {
  el.style.setProperty("--drag-top", bounds.top + "px");
  el.style.setProperty("--drag-left", bounds.left + "px");
  el.style.setProperty("--drag-width", bounds.right - bounds.left + "px");
  el.style.setProperty("--drag-height", bounds.bottom - bounds.top + "px");
}

const AreaMarker = styled.div({
  outline: "1px solid black",
  fontWeight: "lighter",
  fontStyle: "italic",
  padding: "2px",
  position: "relative",
  // I have no idea why I need to specify a z-index here to get this to sit
  // over the grid cell
  zIndex: 1,
  backgroundColor: "var(--light-grey)",
  "&:hover": {
    outline: "2px solid orangered",
  },
  "&.dragging": {
    position: "absolute",
    top: "var(--drag-top, 10px)",
    left: "var(--drag-left, 20px)",
    width: "var(--drag-width, 100px)",
    height: "var(--drag-height, 100px)",
    backgroundColor: "blanchedalmond",
  },
});

const draggerShort = 12;
const draggerAspect = 2;
const draggerLong = draggerShort * draggerAspect;
const Dragger = styled.div({
  display: "grid",
  placeContent: "center",
  position: "absolute",
  outline: "1px solid green",
  "&.up,&.down": {
    height: `${draggerShort}px`,
    width: `${draggerLong}px`,
    left: `calc(50% - ${draggerLong / 2}px)`,
  },
  "&.right,&.left": {
    width: `${draggerShort}px`,
    height: `${draggerLong}px`,
    top: `calc(50% - ${draggerLong / 2}px)`,
  },
  "&.expand.up,&.shink.down": { cursor: "n-resize" },
  "&.expand.down,&.shink.up": { cursor: "s-resize" },
  "&.expand.left,&.shrink.right": { cursor: "w-resize" },
  "&.expand.right,&.shrink.left": { cursor: "e-resize" },
  "&.expand.up": { bottom: "100%" },
  "&.shrink.up": { top: "0" },
  "&.expand.down": { top: "100%" },
  "&.shrink.down": { bottom: "0" },
  "&.expand.right": { left: "100%" },
  "&.expand.left": { right: "100%" },
  "&.shrink.right": { right: "0" },
  "&.shrink.left": { left: "0" },
});
