import { TractDirection } from "../state-logic/gridLayout/atoms";
import { GridPos } from "../types";

export function makeTractPos(start: number, end?: number) {
  const pos = String(start);
  if (typeof end === "undefined") return pos;

  // If a negative end index was provided then just leave it be
  const endIndex = end < 0 ? end : end + 1;
  return pos + "/" + endIndex;
}

export function sameGridPos(a?: GridPos, b?: GridPos) {
  if (typeof a === "undefined" && typeof b === "undefined") return true;

  // If any one of them is undefined now, then one is and the other isnt
  if (typeof a === "undefined" || typeof b === "undefined") return false;

  return (
    a.startCol === b.startCol &&
    a.endCol === b.endCol &&
    a.startRow === b.startRow &&
    a.endRow === b.endRow
  );
}

export function enumerateGridDims({
  numCols,
  numRows,
}: {
  numCols: number;
  numRows: number;
}) {
  return Array.from({ length: numCols * numRows }).map((_, i) => ({
    row: Math.floor(i / numCols) + 1,
    col: (i % numCols) + 1,
  }));
}

export function placeOnGridOrCol({
  index,
  dir,
}: {
  index: number;
  dir: TractDirection;
}) {
  return dir === "rows"
    ? {
        startRow: index + 1,
        startCol: 1,
        endCol: -1,
      }
    : {
        startCol: index + 1,
        startRow: 1,
        endRow: -1,
      };
}
