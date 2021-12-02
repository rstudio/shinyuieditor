import { GridItemExtent } from "components/shiny-ui/GridEditor/helpers";
import { matrixDimensions } from "utils/matrix-helpers";
import { emptyCell } from "./itemLocations";
import { ItemLocation, TemplatedGridProps } from "./types";

export default function moveCandidatesForItem({
  itemLocation: { rowStart, rowSpan, colStart, colSpan },
  layoutAreas,
}: {
  itemLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
}): ItemLocation[] {
  const { numRows, numCols } = matrixDimensions(layoutAreas);

  for (let i = 0; i < numRows; i++) {
    const rowIndex = i + 1;
    for (let j = 0; j < numCols; j++) {
      const colIndex = j + 1;
      const cellValue = layoutAreas[i][j];
    }
  }

  return [];
}

export function blockIsFree(
  { rowStart, rowEnd, colStart, colEnd }: GridItemExtent,
  layoutAreas: TemplatedGridProps["areas"]
) {
  for (let row = rowStart; row <= rowEnd; row++) {
    for (let col = colStart; col <= colEnd; col++) {
      if (layoutAreas[row - 1][col - 1] !== emptyCell) return false;
    }
  }
  return true;
}
