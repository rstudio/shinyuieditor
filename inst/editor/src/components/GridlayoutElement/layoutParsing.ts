import { fillArr } from "../../utils/array-helpers";
import { emptyCell } from "../../utils/gridTemplates/itemLocations";
import { matrixDimensions } from "../../utils/matrix-helpers";
import type { TemplatedGridProps } from "../Grids/EditableGridContainer/TemplatedGridProps";

import type { GridLayoutArgs } from "./GridLayoutArgs";

export function parseGridLayoutArgs({
  layout,
  row_sizes,
  col_sizes,
  gap_size,
}: GridLayoutArgs): TemplatedGridProps & { uniqueAreas: string[] } {
  let numCols: number = -1;
  const numRows = layout.length;
  const uniqueAreas = new Set<string>();
  const matrixLayout: string[][] = [];

  for (let row of layout) {
    const areasInRow = row.trim().split(/\s+/);

    matrixLayout.push(areasInRow);
    areasInRow.forEach((a) => {
      if (a === emptyCell) return;
      uniqueAreas.add(a);
    });
    const numColsInRow = areasInRow.length;

    if (numCols === -1) {
      numCols = numColsInRow;
    }
    if (numCols !== numColsInRow) {
      debugger;
      throw new Error(
        "Invalid layout definition. Not consistant number of columns in every row"
      );
    }
  }

  if (!col_sizes) {
    col_sizes = fillArr("1fr", numCols);
  } else if (col_sizes.length !== numCols) {
    console.log("Bad columns");
    debugger;
    throw new Error("Column sizes vector doesn't match layout definition.");
  }
  if (!row_sizes) {
    row_sizes = fillArr("1fr", numRows);
  } else if (row_sizes.length !== numRows) {
    console.log("Bad rows");
    debugger;
    throw new Error("Row sizes vector doesn't match layout definition.");
  }

  return {
    uniqueAreas: [...uniqueAreas],
    areas: matrixLayout,
    col_sizes,
    row_sizes,
    gap_size: gap_size ?? "12px",
  };
}

export function convertLayoutTableToMatrix(layoutTable: string[]): string[][] {
  const matrixLayout: string[][] = [];

  for (let row of layoutTable) {
    matrixLayout.push(row.trim().split(/\s+/));
  }

  return matrixLayout;
}

export function convertTemplatedLayoutToGridlayoutArgs({
  areas,
  ...sizes
}: TemplatedGridProps): GridLayoutArgs {
  return {
    layout: makeColumnAlignedTable(areas),
    ...sizes,
  };
}

export function convertGridlayoutArgsToTemplatedLayout({
  layout,
  ...sizes
}: GridLayoutArgs): TemplatedGridProps {
  return {
    areas: convertLayoutTableToMatrix(layout),
    ...sizes,
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
