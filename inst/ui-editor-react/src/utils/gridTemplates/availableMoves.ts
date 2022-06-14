import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import { buildRange } from "utils/array-helpers";
import { emptyCell } from "utils/gridTemplates/itemLocations";
import type { ItemLocation } from "utils/gridTemplates/types";

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
  const canShrinkRows = rowSpan > 1;
  const canShrinkCols = colSpan > 1;

  return {
    "expand up": rowIsFree({
      colRange: colIndices,
      rowIndex: rowStart - 1,
      layoutAreas,
    }),
    "expand down": rowIsFree({
      colRange: colIndices,
      rowIndex: rowEnd + 1,
      layoutAreas,
    }),
    "expand left": colIsFree({
      rowRange: rowIndices,
      colIndex: colStart - 1,
      layoutAreas,
    }),
    "expand right": colIsFree({
      rowRange: rowIndices,
      colIndex: colEnd + 1,
      layoutAreas,
    }),
    "shrink up": canShrinkRows,
    "shrink down": canShrinkRows,
    "shrink left": canShrinkCols,
    "shrink right": canShrinkCols,
  };
}

function rowIsFree({
  colRange,
  rowIndex,
  layoutAreas,
}: {
  colRange: number[];
  rowIndex: number;
  layoutAreas: TemplatedGridProps["areas"];
}): boolean {
  if (rowIndex < 1 || rowIndex > layoutAreas.length) return false;
  return colRange.every(
    (colIndex) => layoutAreas[rowIndex - 1][colIndex - 1] === emptyCell
  );
}

function colIsFree({
  rowRange,
  colIndex,
  layoutAreas,
}: {
  rowRange: number[];
  colIndex: number;
  layoutAreas: TemplatedGridProps["areas"];
}): boolean {
  if (colIndex < 1 || colIndex > layoutAreas[0].length) return false;

  return rowRange.every(
    (rowIndex) => layoutAreas[rowIndex - 1][colIndex - 1] === emptyCell
  );
}

export type MovementType = keyof ReturnType<typeof availableMoves>;
