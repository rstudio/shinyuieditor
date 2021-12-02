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

  const cellHasItem = (rowIndex: number, colIndex: number) =>
    layoutAreas[rowIndex - 1][colIndex - 1] !== emptyCell;

  // The range and order of tracts to check if the item can expand
  // This will be increasing for down and right and decreasing for up and left.
  let expansionBounds: [number, number];

  // The smallest tract the item can shrink to if user drags it to one tract long
  let starting_tract: number;

  // First check for the case where there is no expansion possible
  // (Aka item is up against the edge)
  switch (dragDirection) {
    case "up":
      if (rowStart === 1)
        return { searchDir: "rows", rowBounds: [rowEnd, rowStart] };
      expansionBounds = [rowStart - 1, 1];
      starting_tract = rowEnd;
      break;
    case "down":
      if (rowEnd === numRows)
        return { searchDir: "rows", rowBounds: [rowStart, rowEnd] };
      expansionBounds = [rowEnd + 1, numRows];
      starting_tract = rowStart;
      break;
    case "left":
      if (colStart === 1)
        return { searchDir: "cols", colBounds: [colEnd, colStart] };
      expansionBounds = [colStart - 1, 1];
      starting_tract = colEnd;
      break;
    case "right":
      if (colEnd === numCols)
        return { searchDir: "cols", colBounds: [colStart, colEnd] };
      expansionBounds = [colEnd + 1, numCols];
      starting_tract = colStart;
      break;
  }

  if (dragDirection === "up" || dragDirection === "down") {
    const itemColRange = buildRange(colStart, colEnd);

    for (let rowIndex of buildRange(...expansionBounds)) {
      const otherItemInRow = itemColRange.some((colIndex) =>
        cellHasItem(rowIndex, colIndex)
      );
      if (otherItemInRow) {
        // If we've entered a row with an item, back up bounds and finish
        expansionBounds[1] = rowIndex - 1;
        break;
      }
    }

    return {
      searchDir: "rows",
      rowBounds: [starting_tract, expansionBounds[1]],
    };
  } else {
    const itemRowRange = buildRange(rowStart, rowEnd);

    for (let colIndex of buildRange(...expansionBounds)) {
      const otherItemInCol = itemRowRange.some((rowIndex) =>
        cellHasItem(rowIndex, colIndex)
      );
      if (otherItemInCol) {
        // If we've entered a col with an item, back up bounds and finish
        expansionBounds[1] = colIndex - 1;
        break;
      }
    }

    return {
      searchDir: "cols",
      colBounds: [starting_tract, expansionBounds[1]],
    };
  }
}
