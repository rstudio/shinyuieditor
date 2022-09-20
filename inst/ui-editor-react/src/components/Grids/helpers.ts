import type { GridLocString } from "GridTypes";
import type { TractDirection } from "Shiny-Ui-Elements/GridlayoutGridPage";
import type { GridItemExtent, ItemLocation } from "utils/gridTemplates/types";

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

export function toStringLoc({
  row,
  col,
}: {
  row: number;
  col: number;
}): GridLocString {
  return `row${row}-col${col}`;
}
