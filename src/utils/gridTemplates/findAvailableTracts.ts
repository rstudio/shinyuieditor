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

  // First check for the case where there is no expansion possible
  // (Aka item is up against the edge)
  if (dragDirection === "up" && rowStart === 1)
    return { searchDir: "rows", rowBounds: [rowEnd, rowStart] };

  if (dragDirection === "down" && rowEnd === numRows)
    return { searchDir: "rows", rowBounds: [rowStart, rowEnd] };

  if (dragDirection === "left" && colStart === 1)
    return { searchDir: "cols", colBounds: [colEnd, colStart] };

  if (dragDirection === "down" && colEnd === numCols)
    return { searchDir: "cols", colBounds: [colStart, colEnd] };

  if (dragDirection === "up" || dragDirection === "down") {
    const itemColRange = buildRange(colStart, colEnd);

    const expansionBounds: [number, number] =
      dragDirection === "down" ? [rowEnd + 1, numRows] : [rowStart - 1, 1];

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
      rowBounds:
        dragDirection === "down"
          ? [rowStart, expansionBounds[1]]
          : [rowEnd, expansionBounds[1]],
    };
  } else {
    const itemRowRange = buildRange(rowStart, rowEnd);

    const expansionBounds: [number, number] =
      dragDirection === "right" ? [colEnd + 1, numCols] : [colStart - 1, 1];

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
      colBounds:
        dragDirection === "right"
          ? [colStart, expansionBounds[1]]
          : [colEnd, expansionBounds[1]],
    };
  }
}
