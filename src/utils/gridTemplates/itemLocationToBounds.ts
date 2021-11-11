import { TractDirection } from "state-logic/gridLayout/atoms";
import { ItemLocation } from "./types";

export function itemLocationToBounds(
  item: ItemLocation
): {
  rowStart: number;
  colStart: number;
  rowEnd: number;
  colEnd: number;
} {
  const { itemStart: rowStart, itemEnd: rowEnd } = itemBoundsInDir(
    item,
    "rows"
  );
  const { itemStart: colStart, itemEnd: colEnd } = itemBoundsInDir(
    item,
    "cols"
  );

  return {
    rowStart,
    rowEnd,
    colStart,
    colEnd,
  };
}

export function itemBoundsInDir(item: ItemLocation, dir: TractDirection) {
  switch (dir) {
    case "rows":
      return {
        itemStart: item.rowStart,
        itemEnd: item.rowStart + item.rowSpan - 1,
      };
    case "cols":
      return {
        itemStart: item.colStart,
        itemEnd: item.colStart + item.colSpan - 1,
      };
  }
}
