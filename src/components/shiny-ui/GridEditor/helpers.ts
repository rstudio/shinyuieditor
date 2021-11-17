import { TractDirection } from "state-logic/gridLayout/atoms";
import { toStringLoc } from "utils/grid-helpers";
import { ItemLocation } from "utils/gridTemplates/types";
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

  // debugger;
  // Destructuring top left lets us keep the non-changing bounding box info like offsets

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
