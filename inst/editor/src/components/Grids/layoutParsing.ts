import { fillArr } from "../../utils/array-helpers";
import { matrixDimensions } from "../../utils/matrix-helpers";
import type { CSSMeasure } from "../Inputs/CSSUnitInput/CSSMeasure";

type GridLayoutArgs = {
  layout: string[];
  row_sizes?: CSSMeasure[];
  col_sizes?: CSSMeasure[];
  gap_size?: CSSMeasure;
};

export function parseGridLayoutArgs({
  layout,
  row_sizes,
  col_sizes,
  gap_size,
}: GridLayoutArgs) {
  let numCols: number = -1;
  const numRows = layout.length;
  const uniqueAreas = new Set<string>();

  for (let row of layout) {
    const areasInRow = row.split(/\s+/);

    areasInRow.forEach((a) => uniqueAreas.add(a));
    const numColsInRow = areasInRow.length;

    if (numCols === -1) {
      numCols = numColsInRow;
    }
    if (numCols !== numColsInRow) {
      throw new Error(
        "Invalid layout definition. Not consistant number of columns in every row"
      );
    }
  }

  if (!col_sizes) {
    col_sizes = fillArr("1fr", numCols);
  } else if (col_sizes.length !== numCols) {
    throw new Error("Column sizes vector doesn't match layout definition.");
  }
  if (!row_sizes) {
    row_sizes = fillArr("1fr", numRows);
  } else if (row_sizes.length !== numRows) {
    throw new Error("Row sizes vector doesn't match layout definition.");
  }

  return {
    uniqueAreas,
    col_sizes,
    row_sizes,
    gap_size: gap_size ?? "12px",
  };
}

export function makeColumnAlignedTable(mat: string[][]): string[] {
  const { numCols } = matrixDimensions(mat);

  const alignedTable: string[] = [];

  const widestElInCol: number[] = fillArr(-1, numCols);

  for (let row of mat) {
    for (let j = 0; j < numCols; j++) {
      widestElInCol[j] = Math.max(widestElInCol[j], row[j].length);
    }
  }

  for (let row of mat) {
    alignedTable.push(
      row.reduce(
        (all, x, i) =>
          all + x.padEnd(widestElInCol[i], " ") + (i < numCols - 1 ? " " : ""),
        ""
      )
    );
  }

  return alignedTable;
}
