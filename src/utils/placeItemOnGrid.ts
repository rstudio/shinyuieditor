import type { GridItemState } from "state-logic/gridItems";
import { makeBoxShadow } from "utils/css-helpers";
import { makeTractPos } from "utils/grid-helpers";

export function placeItemOnGrid({
  startRow,
  startCol,
  endRow,
  endCol,
  gridArea,
  absoluteBounds,
}: Partial<GridItemState & { gridArea: string }>): React.CSSProperties {
  // If the div has been given an absolute positioning box then we want to
  // use that instead of the grid positions. This is useful for when we want
  // to animate transitions from one point on the grid to another
  if (absoluteBounds) {
    return {
      position: "absolute",
      boxShadow: makeBoxShadow({ height: 1 }),
      transition: "all 0.15s ease-in-out",
      transitionProperty: "box-shadow, top, left, width, height",
      top: absoluteBounds.offsetTop + "px",
      left: absoluteBounds.offsetLeft + "px",
      width: absoluteBounds.right - absoluteBounds.left + "px",
      height: absoluteBounds.bottom - absoluteBounds.top + "px",
    };
  }
  if (startRow && startCol) {
    return {
      position: "relative",
      gridRow: makeTractPos(startRow, endRow),
      gridColumn: makeTractPos(startCol, endCol),
    };
  } else if (gridArea) {
    return {
      gridArea: gridArea,
    };
  } else {
    throw new Error(
      "You need to provide one of rows and cols or gridArea for GridItem"
    );
  }
}
