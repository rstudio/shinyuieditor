import styled from "@emotion/styled";
import React from "react";
import { buildRange } from "utils/array-helpers";
import { emptyCell } from "utils/gridTemplates/itemLocations";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";
import { availableMoves, gridLocationToBounds } from "./helpers";
import { CellLocRef } from "./index";

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

  const clickedMe = () => {
    const itemBounds = gridLocationToBounds({ cellBounds, gridLocation });
    const movementOptions = availableMoves({ gridLocation, layoutAreas });
    console.log({ itemBounds, movementOptions });
  };

  return (
    <AreaMarker
      key={area}
      style={{ gridArea: area }}
      onClick={() => clickedMe()}
    >
      area: {area}
    </AreaMarker>
  );
}

const AreaMarker = styled.div({
  outline: "1px solid black",
  display: "grid",
  placeContent: "end",
  fontWeight: "lighter",
  fontStyle: "italic",
  padding: "2px",
  // I have no idea why I need to specify a z-index here to get this to sit
  // over the grid cell
  zIndex: 1,
  backgroundColor: "var(--light-grey)",
});
