import styled from "@emotion/styled";
import { makeTractPos } from "../grid-helpers";
import { GridPos } from "../GridTypes";

export const GridItemDiv = styled.div(
  ({
    startRow,
    startCol,
    endRow,
    endCol,
    gridArea,
  }: {
    gridArea?: string;
  } & Partial<GridPos>) => {
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
