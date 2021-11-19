import styled from "@emotion/styled";
import React from "react";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";
import {
  availableMoves,
  movementToArrow,
  MovementType,
} from "./availableMoves";
import { CellLocRef } from "./index";
import { useResizeOnDrag } from "./useResizeOnDrag";

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

  const overlayRef = React.useRef<HTMLDivElement>(null);

  const startDrag = useResizeOnDrag({
    overlayRef,
    cellBounds,
    gridLocation,
    layoutAreas,
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
            onMouseDown={() => startDrag(movementType)}
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
    </AreaMarker>
  );
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
  backgroundColor: "var(--rstudio-blue)",
  color: "var(--rstudio-white)",
  // outline: "1px solid var(--rstudio-grey)",
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
