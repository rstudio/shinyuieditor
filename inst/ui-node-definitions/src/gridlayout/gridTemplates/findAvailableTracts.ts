import { buildRange } from "util-functions/src/arrays";

import { gridLocationToExtent } from "./helpers";
import { emptyCell } from "./itemLocations";
import type { TemplatedGridProps } from "./TemplatedGridProps";
import type { ItemLocation } from "./types";

export type DragHandle = "left" | "right" | "up" | "down";

export default function findAvailableTracts({
  dragDirection,
  gridLocation,
  layoutAreas,
}: {
  dragDirection: DragHandle;
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
}): { shrinkExtent: number; growExtent: number } {
  const { rowStart, rowEnd, colStart, colEnd } =
    gridLocationToExtent(gridLocation);
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
  switch (dragDirection) {
    case "up":
      if (rowStart === 1) return { shrinkExtent: rowEnd, growExtent: 1 };
      expandSearchStart = rowStart - 1;
      expandSearchEnd = 1;
      availableRangeStart = rowEnd;
      break;

    case "left":
      if (colStart === 1) return { shrinkExtent: colEnd, growExtent: 1 };
      expandSearchStart = colStart - 1;
      expandSearchEnd = 1;
      availableRangeStart = colEnd;
      break;

    case "down":
      if (rowEnd === nRows)
        return { shrinkExtent: rowStart, growExtent: nRows };
      expandSearchStart = rowEnd + 1;
      expandSearchEnd = nRows;
      availableRangeStart = rowStart;
      break;

    case "right":
      if (colEnd === nCols)
        return { shrinkExtent: colStart, growExtent: nCols };
      expandSearchStart = colEnd + 1;
      expandSearchEnd = nCols;
      availableRangeStart = colStart;
      break;
  }

  const searchingRows = dragDirection === "up" || dragDirection === "down";
  const decreasingSearch = dragDirection === "left" || dragDirection === "up";

  const [itemOffDirStart, itemOffDirEnd] = searchingRows
    ? [colStart, colEnd]
    : [rowStart, rowEnd];

  const cellNotEmpty = (expansionIndex: number, offDirIndex: number) => {
    const [rowIndex, colIndex] = searchingRows
      ? [expansionIndex, offDirIndex]
      : [offDirIndex, expansionIndex];

    return layoutAreas[rowIndex - 1][colIndex - 1] !== emptyCell;
  };

  const itemOffDirRange = buildRange(itemOffDirStart, itemOffDirEnd);
  const expansionRange = buildRange(expandSearchStart, expandSearchEnd);

  // Scan outward from item until we hit another item or the end of the grid
  for (let expansionIndex of expansionRange) {
    for (let offDirIndex of itemOffDirRange) {
      if (cellNotEmpty(expansionIndex, offDirIndex)) {
        // we've found max expansion so finish loop
        return {
          shrinkExtent: availableRangeStart,
          growExtent: expansionIndex + (decreasingSearch ? 1 : -1),
        };
      }
    }
  }

  return { shrinkExtent: availableRangeStart, growExtent: expandSearchEnd };
}
