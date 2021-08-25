import { GridPos } from "../types";

export function makeRowPos({
  startRow,
  endRow,
}: Pick<GridPos, "startRow" | "endRow">) {
  let pos = String(startRow ?? 1);
  if (endRow) pos += "/" + endRow;
  return pos;
}

export function makeColPos({
  startCol,
  endCol,
}: Pick<GridPos, "startCol" | "endCol">) {
  let pos = String(startCol ?? 1);
  if (endCol) pos += "/" + endCol;
  return pos;
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
