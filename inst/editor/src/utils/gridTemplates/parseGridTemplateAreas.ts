import { fillArr } from "util-functions/src/arrays";

import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import type { TractDirection } from "../../Shiny-Ui-Elements/Gridlayout/GridlayoutGridPage";
import type { TemplatedGridProps } from "../../Shiny-Ui-Elements/Gridlayout/Utils/EditableGridContainer/TemplatedGridProps";
import { matrixDimensions, uniqueMatrixElements } from "../matrix-helpers";

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
