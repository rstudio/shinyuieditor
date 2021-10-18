import styled from "@emotion/styled";
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
