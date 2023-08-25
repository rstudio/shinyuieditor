import { fillArr } from "util-functions/src/arrays";
import type { TractDirection } from "util-functions/src/matrix-helpers";
import {
  uniqueMatrixElements,
  matrixDimensions,
} from "util-functions/src/matrix-helpers";

import type { CSSMeasure } from "../../inputFieldTypes";

import type { TemplatedGridProps } from "./TemplatedGridProps";

type ParsedGridTemplate = {
  numRows: number;
  numCols: number;
  uniqueAreas: string[];
  sizes: ReturnType<typeof getTractSizes>;
};

export default function parseGridTemplateAreas({
  areas,
  row_sizes = ["1fr"],
  col_sizes = ["1fr"],
  gap_size = "1rem",
}: TemplatedGridProps): ParsedGridTemplate {
  const sizes = getTractSizes({
    areas,
    row_sizes: row_sizes,
    col_sizes: col_sizes,
  });

  return {
    numRows: sizes.rows.length,
    numCols: sizes.cols.length,
    sizes,
    uniqueAreas: uniqueMatrixElements(areas, { ignore: ["."] }),
  };
}

export function getTractSizes({
  areas,
  row_sizes = ["1fr"],
  col_sizes = ["1fr"],
}: Pick<TemplatedGridProps, "areas" | "row_sizes" | "col_sizes">): Record<
  TractDirection,
  CSSMeasure[]
> {
  const { numRows, numCols } = matrixDimensions(areas);

  return {
    rows: buildTractSizes(numRows, row_sizes, "row"),
    cols: buildTractSizes(numCols, col_sizes, "column"),
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
