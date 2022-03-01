import React from "react";

import {
  AiFillCaretDown,
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillCaretUp,
} from "react-icons/ai";
import { RiDragMove2Line as MoveIcon } from "react-icons/ri";
import {
  GridItemExtent,
  ItemLocation,
  TemplatedGridProps,
} from "utils/gridTemplates/types";

import {
  availableMoves,
  MovementType,
} from "../../../../utils/gridTemplates/availableMoves";
import classes from "./AreaOverlay.module.css";
import { CellLocRef } from "./GridCell";
import { useResizeOnDrag } from "./useResizeOnDrag";

export function AreaOverlay({
  area,
  cellLocRef: { current: cellBounds },
  gridLocation,
  areas: layoutAreas,
  onNewPos,
}: {
  area: string;
  cellLocRef: CellLocRef;
  gridLocation?: ItemLocation;
  areas: TemplatedGridProps["areas"];
  onNewPos: (pos: GridItemExtent) => void;
}) {
  if (typeof gridLocation === "undefined")
    throw new Error(`Item in ${area} is not in the location map`);

  const overlayRef = React.useRef<HTMLDivElement>(null);

  const startDrag = useResizeOnDrag({
    overlayRef,
    cellBounds,
    gridLocation,
    layoutAreas,
    onDragEnd: onNewPos,
  });

  const movementOptions = React.useMemo(
    () => availableMoves({ gridLocation, layoutAreas }),
    [gridLocation, layoutAreas]
  );

  const movementHandles = React.useMemo(() => {
    let movementArrows: JSX.Element[] = [];

    for (let key in movementOptions) {
      const movementType = key as MovementType;
      if (movementOptions[movementType]) {
        movementArrows.push(
          <div
            key={movementType}
            className={classes.dragger + " " + movementType}
            onMouseDown={() => startDrag(simplifySide(movementType))}
          >
            {movementToArrow[movementType]}
          </div>
        );
      }
    }
    return movementArrows;
  }, [movementOptions, startDrag]);

  React.useEffect(() => {
    overlayRef.current?.style.setProperty("--grid-area", area);
  }, [area]);

  return (
    <div ref={overlayRef} className={classes.marker + " grid-area-overlay"}>
      {movementHandles}
      <div
        className={classes.dragger + " " + classes.move}
        onMouseDown={() => startDrag("move")}
      >
        <MoveIcon />
      </div>
    </div>
  );
}

function simplifySide(side: MovementType) {
  switch (side) {
    case "expand down":
    case "shrink down":
      return "down";
    case "expand up":
    case "shrink up":
      return "up";
    case "expand left":
    case "shrink left":
      return "left";
    case "expand right":
    case "shrink right":
      return "right";
  }
}

const RightArrow = AiFillCaretRight;
const LeftArrow = AiFillCaretLeft;
const UpArrow = AiFillCaretUp;
const DownArrow = AiFillCaretDown;

export const movementToArrow: Record<MovementType, JSX.Element> = {
  "expand up": <UpArrow />,
  "expand down": <DownArrow />,
  "shrink down": <UpArrow />,
  "shrink up": <DownArrow />,
  "expand left": <LeftArrow />,
  "expand right": <RightArrow />,
  "shrink left": <RightArrow />,
  "shrink right": <LeftArrow />,
};
