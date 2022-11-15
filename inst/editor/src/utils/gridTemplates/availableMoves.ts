import type { TemplatedGridProps } from "../../Shiny-Ui-Elements/GridlayoutGridPage";
import { buildRange } from "../array-helpers";

import { emptyCell } from "./itemLocations";
import type { ItemLocation } from "./types";

export type ResizeDirection = "up" | "down" | "left" | "right";
export function availableMoves({
  gridLocation: { rowStart, rowSpan, colStart, colSpan },
  layoutAreas,
}: {
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
}): ResizeDirection[] {
  const rowEnd = rowStart + rowSpan - 1;
  const colEnd = colStart + colSpan - 1;
  const rowIndices = buildRange(rowStart, rowEnd);
  const colIndices = buildRange(colStart, colEnd);
  const canShrinkRows = rowSpan > 1;
  const canShrinkCols = colSpan > 1;

  const resizeDirs: ResizeDirection[] = [];

  if (
    rowIsFree({
      colRange: colIndices,
      rowIndex: rowStart - 1,
      layoutAreas,
    }) ||
    canShrinkRows
  )
    resizeDirs.push("up");

  if (
    rowIsFree({
      colRange: colIndices,
      rowIndex: rowEnd + 1,
      layoutAreas,
    }) ||
    canShrinkRows
  )
    resizeDirs.push("down");

  if (
    colIsFree({
      rowRange: rowIndices,
      colIndex: colStart - 1,
      layoutAreas,
    }) ||
    canShrinkCols
  )
    resizeDirs.push("left");

  if (
    colIsFree({
      rowRange: rowIndices,
      colIndex: colEnd + 1,
      layoutAreas,
    }) ||
    canShrinkCols
  )
    resizeDirs.push("right");

  return resizeDirs;
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
