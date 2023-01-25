/**
 * Positional info of item on grid along with validity
 */
export type ItemLocation = {
  rowStart: number;
  colStart: number;
  rowSpan: number;
  colSpan: number;
};

export type GridItemExtent = {
  rowStart: number;
  colStart: number;
  rowEnd: number;
  colEnd: number;
};

export type GridCellLocation = {
  row: number;
  col: number;
};
