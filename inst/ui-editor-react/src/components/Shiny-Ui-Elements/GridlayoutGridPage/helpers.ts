import { toStringLoc } from "utils/grid-helpers";
import type { GridItemExtent, ItemLocation } from "utils/gridTemplates/types";
import type { ItemBoundingBox } from "utils/overlap-helpers";

import type { TractDirection } from ".";

import type { GridCellBounds } from "./GridCell";

export const directions: TractDirection[] = ["rows", "cols"];
export function singular(dir: TractDirection): "row" | "column" {
  return dir === "rows" ? "row" : "column";
}

export function gridLocationToExtent({
  rowStart,
  rowSpan,
  colStart,
  colSpan,
}: ItemLocation) {
  return {
    rowStart,
    rowEnd: rowStart + rowSpan - 1,
    colStart,
    colEnd: colStart + colSpan - 1,
  };
}

export function gridExtentToLocation({
  rowStart,
  rowEnd,
  colStart,
  colEnd,
}: GridItemExtent): ItemLocation {
  return {
    rowStart,
    rowSpan: rowEnd - rowStart + 1,
    colStart,
    colSpan: colEnd - colStart + 1,
  };
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

  const left = topLeft.offsetLeft;
  const top = topLeft.offsetTop;
  const width = bottomRight.right - topLeft.left;
  const height = bottomRight.bottom - topLeft.top;
  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
  };
}

export function centerOfBounds({
  top,
  left,
  right,
  bottom,
}: ReturnType<typeof gridLocationToBounds>) {
  return { x: (left + right) / 2, y: (top + bottom) / 2 };
}

export function clamp({
  min = -Infinity,
  val,
  max = Infinity,
}: {
  min?: number;
  val: number;
  max?: number;
}) {
  return Math.min(Math.max(min, val), max);
}

export function boundingBoxToExtent(box: ItemBoundingBox) {
  const left = box.offsetLeft;
  const top = box.offsetTop;
  const width = box.right - left;
  const height = box.bottom - top;
  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
  };
}
