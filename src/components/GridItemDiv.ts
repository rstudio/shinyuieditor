import styled from "@emotion/styled";
import { GridItemState } from "state-logic/gridItems";
import { makeBoxShadow } from "utils/css-helpers";
import { makeTractPos } from "utils/grid-helpers";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { GridPos } from "../GridTypes";

export const GridItemDiv = styled.div(
  ({
    startRow,
    startCol,
    endRow,
    endCol,
    gridArea,
    absoluteBounds,
  }: {
    absoluteBounds?: ItemBoundingBox;
    gridArea?: string;
  } & Partial<GridPos>) => {
    // If the div has been given an absolute positioning box then we want to
    // use that instead of the grid positions. This is useful for when we want
    // to animate transitions from one point on the grid to another
    if (absoluteBounds) {
      return {
        position: "absolute",
        boxShadow: makeBoxShadow({ height: 1 }),
        transition: "all 0.15s ease-in-out",
        transitionProperty: "box-shadow, top, left, width, height",
        top: "var(--pos-top)",
        left: "var(--pos-left)",
        width: "var(--pos-width)",
        height: "var(--pos-height)",
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
      console.error(
        "You need to provide one of rows and cols or gridArea for GridItem"
      );
    }
  }
);

export function makeAbsolutePositionStyles(itemDef: GridItemState) {
  return itemDef.absoluteBounds
    ? ({
        "--pos-top": itemDef.absoluteBounds.offsetTop + "px",
        "--pos-left": itemDef.absoluteBounds.offsetLeft + "px",
        "--pos-width":
          itemDef.absoluteBounds.right - itemDef.absoluteBounds.left + "px",
        "--pos-height":
          itemDef.absoluteBounds.bottom - itemDef.absoluteBounds.top + "px",
      } as React.CSSProperties)
    : undefined;
}
