import styled from "@emotion/styled";
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
import { CellLocRef } from ".";
import {
  availableMoves,
  MovementType,
} from "../../../../utils/gridTemplates/availableMoves";
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
          <Dragger
            key={movementType}
            className={movementType}
            onMouseDown={() => startDrag(simplifySide(movementType))}
          >
            {movementToArrow[movementType]}
          </Dragger>
        );
      }
    }
    return movementArrows;
  }, [movementOptions, startDrag]);

  React.useEffect(() => {
    overlayRef.current?.style.setProperty("--grid-area", area);
  }, [area]);

  return (
    <AreaMarker ref={overlayRef} className="grid-area-overlay">
      {movementHandles}
      <Dragger className="move" onMouseDown={() => startDrag("move")}>
        <MoveIcon />
      </Dragger>
    </AreaMarker>
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

const AreaMarker = styled.div({
  outline: "1px solid black",
  fontWeight: "lighter",
  fontStyle: "italic",
  padding: "2px",
  position: "relative",
  // I have no idea why I need to specify a z-index here to get this to sit
  // over the grid cell
  zIndex: 1,
  backgroundColor: "var(--light-grey-transparent)",
  "&:hover": {
    outline: "2px solid var(--rstudio-blue)",
  },
  // "&.dragging": {
  //   position: "absolute",
  //   top: "var(--drag-top, 10px)",
  //   left: "var(--drag-left, 20px)",
  //   width: "var(--drag-width, 100px)",
  //   height: "var(--drag-height, 100px)",
  //   backgroundColor: "blanchedalmond",
  // },
  "&:not(.dragging)": {
    gridArea: "var(--grid-area)",
  },
  "&.dragging": {
    gridRowStart: "var(--drag-grid-row-start)",
    gridRowEnd: "var(--drag-grid-row-end)",
    gridColumnStart: "var(--drag-grid-column-start)",
    gridColumnEnd: "var(--drag-grid-column-end)",
    backgroundColor: "var(--rstudio-blue-transparent)",
  },
});

const draggerShort = 12;
const draggerAspect = 2;
const draggerLong = draggerShort * draggerAspect;
const Dragger = styled.div({
  display: "grid",
  placeContent: "center",
  position: "absolute",
  backgroundColor: "var(--rstudio-blue)",
  color: "var(--rstudio-white)",
  "&.move": {
    height: `${draggerLong}px`,
    width: `${draggerLong}px`,
    left: `calc(50% - ${draggerLong / 2}px)`,
    top: `calc(50% - ${draggerLong / 2}px)`,
    cursor: "grab",
  },
  "&.up,&.down": {
    height: `${draggerShort}px`,
    width: `${draggerLong}px`,
    left: `calc(50% - ${draggerLong / 2}px)`,
    cursor: "ns-resize",
  },
  "&.right,&.left": {
    width: `${draggerShort}px`,
    height: `${draggerLong}px`,
    top: `calc(50% - ${draggerLong / 2}px)`,
    cursor: "ew-resize",
  },
  "&.expand.up": { bottom: "100%" },
  "&.shrink.up": { top: "0" },
  "&.expand.down": { top: "100%" },
  "&.shrink.down": { bottom: "0" },
  "&.expand.right": { left: "100%" },
  "&.expand.left": { right: "100%" },
  "&.shrink.right": { right: "0" },
  "&.shrink.left": { left: "0" },
});

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
