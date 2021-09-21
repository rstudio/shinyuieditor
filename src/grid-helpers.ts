import * as React from "react";
import { GridPos } from "./GridTypes";

export function makeTractPos(start: number, end?: number) {
  const pos = String(start);
  if (typeof end === "undefined") return pos;

  // If a negative end index was provided then just leave it be
  const endIndex = end < 0 ? end : end + 1;
  return pos + "/" + endIndex;
}
export function addGridPosToStyles(
  {
    startRow,
    startCol,
    endRow,
    endCol,
    gridArea,
  }: {
    gridArea?: string;
  } & Partial<GridPos>,
  extraStyles?: React.CSSProperties
): React.CSSProperties {
  const styles = { ...extraStyles };

  if (startRow && startCol) {
    styles.gridRow = makeTractPos(startRow, endRow);
    styles.gridColumn = makeTractPos(startCol, endCol);
  } else if (gridArea) {
    styles.gridArea = gridArea;
  } else {
    console.error(
      "You need to provide one of rows and cols or gridArea for GridItem"
    );
  }

  return styles;
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
