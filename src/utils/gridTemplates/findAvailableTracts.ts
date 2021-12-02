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
  const nRows = layoutAreas.length;
  const nCols = layoutAreas[0].length;

  // Get general expansion direction and also check to make sure the item isn't
  // up against the edge of the grid meaning no expansion can happen

  // The tract index we start searching outward from when scanning
  let expandSearchStart: number;

  // Last tract to test (either the start or end of the grid depending on dir)
  let expandSearchEnd: number;

  // Tract index that the item can shrink to.
  let availableRangeStart: number;

  // Tract index that the item can expand to.
  let availableRangeEnd: number | null = null;

  switch (dragDirection) {
    case "up":
      if (rowStart === 1) availableRangeEnd = 1;
      expandSearchStart = rowStart - 1;
      expandSearchEnd = 1;
      availableRangeStart = rowEnd;
      break;

    case "left":
      if (colStart === 1) availableRangeEnd = 1;
      expandSearchStart = colStart - 1;
      expandSearchEnd = 1;
      availableRangeStart = colEnd;
      break;

    case "down":
      if (rowEnd === nRows) availableRangeEnd = nRows;
      expandSearchStart = rowEnd + 1;
      expandSearchEnd = nRows;
      availableRangeStart = rowStart;
      break;

    case "right":
      if (colEnd === nCols) availableRangeEnd = nCols;
      expandSearchStart = colEnd + 1;
      expandSearchEnd = nCols;
      availableRangeStart = colStart;
      break;
  }

  const expansionTractDir =
    dragDirection === "up" || dragDirection === "down" ? "rows" : "cols";

  const [itemOffDirStart, itemOffDirEnd] =
    expansionTractDir === "rows" ? [colStart, colEnd] : [rowStart, rowEnd];

  const cellNotEmpty = (expansionIndex: number, offDirIndex: number) => {
    const [rowIndex, colIndex] =
      expansionTractDir === "rows"
        ? [expansionIndex, offDirIndex]
        : [offDirIndex, expansionIndex];

    return layoutAreas[rowIndex - 1][colIndex - 1] !== emptyCell;
  };

  const itemOffDirRange = buildRange(itemOffDirStart, itemOffDirEnd);
  const expansionRange = buildRange(expandSearchStart, expandSearchEnd);

  // Scan outward from item until we hit another item or the end of the grid
  for (let expansionIndex of expansionRange) {
    if (availableRangeEnd) break; // we've found max expansion so finish loop

    for (let offDirIndex of itemOffDirRange) {
      if (cellNotEmpty(expansionIndex, offDirIndex)) {
        availableRangeEnd = expansionIndex - 1;
        break;
      }
    }
  }

  const availableExpansionTracts: [number, number] = [
    availableRangeStart,
    availableRangeEnd ?? expandSearchEnd,
  ];

  if (expansionTractDir === "rows") {
    return {
      searchDir: "rows",
      rowBounds: availableExpansionTracts,
    };
  }
  return {
    searchDir: "cols",
    colBounds: availableExpansionTracts,
  };
}
