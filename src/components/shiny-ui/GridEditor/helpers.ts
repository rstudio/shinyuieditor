import { TractDirection } from "state-logic/gridLayout/atoms";
import { buildRange } from "utils/array-helpers";
import { toStringLoc } from "utils/grid-helpers";
import { emptyCell } from "utils/gridTemplates/itemLocations";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { GridCellBounds } from ".";

export const directions: TractDirection[] = ["rows", "cols"];
export function singular(dir: TractDirection): "row" | "column" {
  return dir === "rows" ? "row" : "column";
}

export function gridLocationToBounds({
  gridLocation: { rowStart, rowSpan, colStart, colSpan },
  cellBounds,
}: {
  gridLocation: ItemLocation;
  cellBounds: GridCellBounds;
}) {
  const topLeft = cellBounds[toStringLoc({ row: rowStart, col: colStart })];
  const bottomRight =
    cellBounds[
      toStringLoc({ row: rowStart + rowSpan - 1, col: colStart + colSpan - 1 })
    ];

  // Destructuring top left lets us keep the non-changing bounding box info like offsets
  const itemBounds: ItemBoundingBox = {
    ...topLeft,
    right: bottomRight.right,
    bottom: bottomRight.bottom,
  };

  return itemBounds;
}
export function availableMoves({
  gridLocation: { rowStart, rowSpan, colStart, colSpan },
  layoutAreas,
}: {
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
}) {
  const rowEnd = rowStart + rowSpan - 1;
  const colEnd = colStart + colSpan - 1;
  const rowIndices = buildRange(rowStart, rowEnd);
  const colIndices = buildRange(colStart, colEnd);

  return {
    canExpandUp: colIndices.every((col) =>
      isEmptyCell({ row: rowStart - 1, col }, layoutAreas)
    ),
    canExpandDown: colIndices.every((col) =>
      isEmptyCell({ row: rowEnd + 1, col }, layoutAreas)
    ),
    canExpandLeft: rowIndices.every((row) =>
      isEmptyCell({ row, col: colStart - 1 }, layoutAreas)
    ),
    canExpandRight: rowIndices.every((row) =>
      isEmptyCell({ row, col: colEnd + 1 }, layoutAreas)
    ),
    canShrinkRows: rowSpan > 1,
    canShrinkCols: colSpan > 1,
  };
}

function isEmptyCell(
  { row, col }: { row: number; col: number },
  layoutAreas: TemplatedGridProps["areas"]
) {
  if (row < 1 || row > layoutAreas.length) return false;
  const nCols = layoutAreas[0].length;
  if (col < 1 || col > nCols) return false;

  return layoutAreas[row - 1][col - 1] === emptyCell;
}
