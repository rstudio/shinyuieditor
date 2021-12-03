import { GridItemExtent } from "components/shiny-ui/GridEditor/helpers";
import { matrixDimensions } from "utils/matrix-helpers";
import { emptyCell } from "./itemLocations";
import { ItemLocation, TemplatedGridProps } from "./types";

export default function moveCandidatesForItem({
  rowSpan,
  colSpan,
  layoutAreas,
}: {
  rowSpan: number;
  colSpan: number;
  layoutAreas: TemplatedGridProps["areas"];
}): ItemLocation[] {
  const freeBlocks: ItemLocation[] = [];
  const { numRows, numCols } = matrixDimensions(layoutAreas);

  const isFree = ({
    rowIndex,
    colIndex,
  }: {
    rowIndex: number;
    colIndex: number;
  }) => {
    for (let row = rowIndex; row <= rowIndex + rowSpan - 1; row++) {
      for (let col = colIndex; col <= colIndex + colSpan - 1; col++) {
        if (layoutAreas[row - 1][col - 1] !== emptyCell) return false;
      }
    }
    return true;
  };

  // Since we check outwards we shound not traverse the whole grid in this loop
  for (let rowIndex = 1; rowIndex <= numRows - rowSpan + 1; rowIndex++) {
    for (let colIndex = 1; colIndex <= numCols - colSpan + 1; colIndex++) {
      if (isFree({ rowIndex, colIndex })) {
        freeBlocks.push({
          rowStart: rowIndex,
          rowSpan,
          colStart: colIndex,
          colSpan,
        });
      }
    }
  }

  return freeBlocks;
}
