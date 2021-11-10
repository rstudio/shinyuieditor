import { arrayRange, matrixDimensions } from "utils/array-helpers";
import { TemplatedGridProps } from "./types";

/**
 * What unique cell positions an item occupies
 */
type ItemCells = { itemRows: Set<number>; itemCols: Set<number> };

/**
 * Positional info of item on grid along with validity
 */
export type ItemLocation = {
  rowStart: number;
  colStart: number;
  rowSpan: number;
  colSpan: number;
  isValid: boolean;
};
type ItemList = Map<string, ItemLocation>;

function areasToItemCells(
  areas: TemplatedGridProps["areas"]
): Map<string, ItemCells> {
  const itemToCells = new Map<string, ItemCells>();

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

function itemCellsToLocation({ itemRows, itemCols }: ItemCells): ItemLocation {
  const rowsRange = arrayRange(itemRows);
  const colsRange = arrayRange(itemCols);

  return {
    colStart: colsRange.minVal,
    rowStart: rowsRange.minVal,
    colSpan: colsRange.span + 1,
    rowSpan: rowsRange.span + 1,
    isValid: rowsRange.isSequence && colsRange.isSequence,
  };
}

export function areasToItemList(areas: TemplatedGridProps["areas"]): ItemList {
  const itemList: ItemList = new Map();

  areasToItemCells(areas).forEach((itemCells, itemName) => {
    itemList.set(itemName, itemCellsToLocation(itemCells));
  });

  return itemList;
}
