import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import type { GridCellBounds } from "components/Shiny-Ui-Elements/GridlayoutGridPage/GridCell";
import {
  centerOfBounds,
  gridLocationToBounds,
  gridLocationToExtent,
} from "components/Shiny-Ui-Elements/GridlayoutGridPage/helpers";
import { matrixDimensions } from "utils/matrix-helpers";

import { emptyCell } from "./itemLocations";
import type { GridItemExtent, ItemLocation } from "./types";

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

export type AvailableBlocks = {
  block: ItemLocation;
  center: { x: number; y: number };
}[];

export function centersOfAvailableBlocks({
  itemLoc,
  layoutAreas,
  cellBounds,
}: {
  itemLoc: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
  cellBounds: GridCellBounds;
}): AvailableBlocks {
  return moveCandidatesForItem(itemLoc, layoutAreas).map((block, i) => {
    return {
      block,
      isSelf: i === 0,
      center: centerOfBounds(
        gridLocationToBounds({
          gridLocation: block,
          cellBounds,
        })
      ),
    };
  });
}

type Point = { x: number; y: number };
export function findClosestAvailableBlock(
  currentPos: Point,
  availableBlocks: AvailableBlocks
) {
  // Loop through all blocks possible to move to and keep track of the closest
  // one to the current drag.
  let distToClosest: number = Infinity;
  let currentClosestBlock: ItemLocation = availableBlocks[0].block;
  availableBlocks.forEach(({ block, center }) => {
    const distToBlock = distBetween(currentPos, center);
    if (distToBlock < distToClosest) {
      currentClosestBlock = block;
      distToClosest = distToBlock;
    }
  });
  return currentClosestBlock;
}
function distBetween(a: Point, b: Point) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

export function sameLocation(
  a?: ItemLocation | GridItemExtent,
  b?: ItemLocation | GridItemExtent
) {
  if (typeof a === "undefined" && typeof b === "undefined") return true;

  // If any one of them is undefined now, then one is and the other isnt
  if (typeof a === "undefined" || typeof b === "undefined") return false;

  if ("colSpan" in a) {
    a = gridLocationToExtent(a);
  }
  if ("colSpan" in b) {
    b = gridLocationToExtent(b);
  }

  return (
    a.colStart === b.colStart &&
    a.colEnd === b.colEnd &&
    a.rowStart === b.rowStart &&
    a.rowEnd === b.rowEnd
  );
}
