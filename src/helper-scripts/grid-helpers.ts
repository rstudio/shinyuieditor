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
