import { GridCellBounds } from "components/shiny-ui/GridEditor";
import {
  centerOfBounds,
  GridItemExtent,
  gridLocationToBounds,
  gridLocationToExtent,
} from "components/shiny-ui/GridEditor/helpers";
import { matrixDimensions } from "utils/matrix-helpers";
import { emptyCell } from "./itemLocations";
import { ItemLocation, TemplatedGridProps } from "./types";

export default function moveCandidatesForItem(
  { rowSpan, colSpan, rowStart, colStart }: ItemLocation,
  layoutAreas: TemplatedGridProps["areas"]
): ItemLocation[] {
  const freeBlocks: ItemLocation[] = [];
  const { numRows, numCols } = matrixDimensions(layoutAreas);

  // Get the name of the item so we can ignore it when scanning
  const itemName = layoutAreas[rowStart - 1][colStart - 1];
  const isFree = ({
    rowIndex,
    colIndex,
  }: {
    rowIndex: number;
    colIndex: number;
  }) => {
    for (let row = rowIndex; row <= rowIndex + rowSpan - 1; row++) {
      for (let col = colIndex; col <= colIndex + colSpan - 1; col++) {
        const cellVal = layoutAreas[row - 1][col - 1];
        if (!(cellVal === emptyCell || cellVal === itemName)) return false;
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

export function centersOfAvailableBlocks({
  rowSpan,
  colSpan,
  layoutAreas,
  cellBounds,
}: {
  rowSpan: number;
  colSpan: number;
  layoutAreas: TemplatedGridProps["areas"];
  cellBounds: GridCellBounds;
}): { block: ItemLocation; center: { x: number; y: number } }[] {
  const availableBlocks = moveCandidatesForItem({
    rowSpan,
    colSpan,
    layoutAreas,
  });

  return availableBlocks.map((block) => {
    return {
      block,
      center: centerOfBounds(
        gridLocationToBounds({
          gridLocation: block,
          cellBounds,
        })
      ),
    };
  });
}

// function findClosestAvailableBlock(currentPos: Point, blocks: GridBlock[]) {
//   // Loop through all blocks possible to move to and keep track of the closest
//   // one to the current drag.
//   let distToClosest: number = Infinity;
//   let currentClosestBlock: GridBlock = blocks[0];
//   blocks.forEach((block) => {
//     const distToBlock = distBetween(currentPos, block.center);
//     if (distToBlock < distToClosest) {
//       currentClosestBlock = block;
//       distToClosest = distToBlock;
//     }
//   });

//   return currentClosestBlock;
// }
