import { DragDirection } from "components/shiny-ui/GridEditor/useResizeOnDrag";
import { buildRange } from "utils/array-helpers";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";
import { gridLocationToExtent } from "../../components/shiny-ui/GridEditor/helpers";
import { TractRegion } from "./availableCellsForItem";
import { emptyCell } from "./itemLocations";

export function findAvailableTracts({
  dragDirection,
  gridLocation,
  layoutAreas,
}: {
  dragDirection: DragDirection;
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
}): TractRegion {
  const { rowStart, rowEnd, colStart, colEnd } = gridLocationToExtent(
    gridLocation
  );
  const numRows = layoutAreas.length;
  const numCols = layoutAreas[0].length;

  // The range and order of tracts to check if the item can expand
  // This will be increasing for down and right and decreasing for up and left.
  let expansionBounds: [number, number];

  // The smallest tract the item can shrink to if user drags it to one tract long
  let starting_tract: number;

  // First check for the case where there is no expansion possible
  // (Aka item is up against the edge)
  switch (dragDirection) {
    case "up":
      expansionBounds = [rowStart - 1, 1];
      starting_tract = rowEnd;
      break;
    case "down":
      debugger;
      expansionBounds = [rowEnd + 1, numRows];
      starting_tract = rowStart;
      break;
    case "left":
      expansionBounds = [colStart - 1, 1];
      starting_tract = colEnd;
      break;
    case "right":
      expansionBounds = [colEnd + 1, numCols];
      starting_tract = colStart;
      break;
  }

  const searchDir =
    dragDirection === "up" || dragDirection === "down" ? "rows" : "cols";

  const furthestExpansion = findFurthestExpansionTract({
    dragDirection,
    itemOffDirSpan:
      searchDir === "rows" ? [colStart, colEnd] : [rowStart, rowEnd],
    expansionBounds: expansionBounds,
    layoutAreas,
  });

  if (searchDir === "rows") {
    return {
      searchDir: "rows",
      rowBounds: [starting_tract, furthestExpansion],
    };
  } else {
    return {
      searchDir: "cols",
      colBounds: [starting_tract, furthestExpansion],
    };
  }
}

function findFurthestExpansionTract({
  dragDirection,
  itemOffDirSpan,
  expansionBounds: [expandStart, expandEnd],
  layoutAreas,
}: {
  dragDirection: DragDirection;
  itemOffDirSpan: [number, number];
  expansionBounds: [number, number];
  layoutAreas: TemplatedGridProps["areas"];
}) {
  // Get general expansion direction and also check to make sure the item isn't
  // up against the edge of the grid meaning no expansion can happen
  switch (dragDirection) {
    case "up":
      if (expandStart < 1) return 1;
      break;

    case "left":
      if (expandStart < 1) return 1;
      break;

    case "down": {
      const nRows = layoutAreas.length;
      if (expandStart > nRows) return nRows;
      break;
    }

    case "right": {
      const nCols = layoutAreas[0].length;
      if (expandStart > nCols) return nCols;
      break;
    }
  }

  const cellNotEmpty = (expansionIndex: number, offDirIndex: number) => {
    const [rowIndex, colIndex] =
      dragDirection === "up" || dragDirection === "down"
        ? [expansionIndex, offDirIndex]
        : [offDirIndex, expansionIndex];

    return layoutAreas[rowIndex - 1][colIndex - 1] !== emptyCell;
  };

  const itemOffDirRange = buildRange(...itemOffDirSpan);
  const expansionRange = buildRange(expandStart, expandEnd);
  for (let expansionIndex of expansionRange) {
    for (let offDirIndex of itemOffDirRange) {
      if (cellNotEmpty(expansionIndex, offDirIndex)) {
        return expansionIndex - 1;
      }
    }
  }

  return expandEnd;
}
