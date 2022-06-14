import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import { arrayRange } from "utils/array-helpers";
import { matrixDimensions } from "utils/matrix-helpers";

import type { ItemLocation } from "./types";
export const emptyCell = ".";

export function areasToItemLocations(areas: TemplatedGridProps["areas"]) {
  const itemList = new Map<string, ItemLocation & { isValid: boolean }>();

  areasToItemCells(areas).forEach(({ itemRows, itemCols }, itemName) => {
    if (itemName === emptyCell) return;
    const rowsRange = arrayRange(itemRows);
    const colsRange = arrayRange(itemCols);
    itemList.set(itemName, {
      colStart: colsRange.minVal,
      rowStart: rowsRange.minVal,
      colSpan: colsRange.span + 1,
      rowSpan: rowsRange.span + 1,
      isValid: rowsRange.isSequence && colsRange.isSequence,
    });
  });

  return itemList;
}

/**
 * What unique cell positions an item occupies
 */

function areasToItemCells(areas: TemplatedGridProps["areas"]) {
  const itemToCells = new Map<
    string,
    { itemRows: Set<number>; itemCols: Set<number> }
  >();

  const { numRows, numCols } = matrixDimensions(areas);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const itemName = areas[row][col];
      const itemCells = itemToCells.get(itemName) ?? {
        itemRows: new Set(),
        itemCols: new Set(),
      };
      itemCells.itemRows.add(row + 1);
      itemCells.itemCols.add(col + 1);

      // We add one here because the CSS-Grid world indexes at 1
      itemToCells.set(itemName, itemCells);
    }
  }

  return itemToCells;
}
