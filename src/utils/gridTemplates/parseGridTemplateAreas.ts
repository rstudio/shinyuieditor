import { CSSMeasure } from "GridTypes";
import { TractDirection } from "state-logic/gridLayout/atoms";
import {
  fillArr,
  matrixDimensions,
  uniqueMatrixElements,
} from "../array-helpers";
import { TemplatedGridProps } from "./types";

type GridContainerStyles = Pick<
  React.CSSProperties,
  | "gridTemplateAreas"
  | "gridTemplateColumns"
  | "gridTemplateRows"
  | "gap"
  | "padding"
>;

export default function parseGridTemplateAreas({
  areas,
  rowSizes = "1fr",
  colSizes = "1fr",
  gapSize = "1rem",
}: TemplatedGridProps): {
  numRows: number;
  numCols: number;
  styles: GridContainerStyles;
  uniqueAreas: string[];
} {
  const gridTemplateAreas = areas
    .map((rowDef) => `"${rowDef.join(" ")}"`)
    .join("\n");

  const sizes = getTractSizes({ areas, rowSizes, colSizes });

  return {
    numRows: sizes.rows.length,
    numCols: sizes.cols.length,
    styles: {
      gridTemplateAreas,
      gridTemplateColumns: sizes.cols.join(" "),
      gridTemplateRows: sizes.rows.join(" "),
      gap: gapSize,
      padding: gapSize,
    },
    uniqueAreas: uniqueMatrixElements(areas),
  };
}

export function getTractSizes({
  areas,
  rowSizes = "1fr",
  colSizes = "1fr",
}: Pick<TemplatedGridProps, "areas" | "rowSizes" | "colSizes">): Record<
  TractDirection,
  CSSMeasure[]
> {
  const { numRows, numCols } = matrixDimensions(areas);

  return {
    rows: buildTractSizes(numRows, rowSizes, "row"),
    cols: buildTractSizes(numCols, colSizes, "column"),
  };
}

export function buildTractSizes(
  numTracts: number,
  tractSizes: CSSMeasure[] | CSSMeasure,
  dir: "row" | "column"
): CSSMeasure[] {
  if (!Array.isArray(tractSizes)) return fillArr(tractSizes, numTracts);

  if (numTracts !== tractSizes.length)
    throw new Error(
      `Number of ${dir} sizes does not match the number of ${dir}s in the areas template. 
    Either make sure they match or use a single ${dir} size that will be repeated for all ${dir}s.`
    );

  return tractSizes;
}
