import { CSSMeasure } from "GridTypes";
import { TractDirection } from "components/shiny-ui/GridApp/helpers";
import { fillArr } from "utils/array-helpers";
import { matrixDimensions } from "utils/matrix-helpers";
import { TemplatedGridProps } from "./types";

export default function resizeTract(
  template: TemplatedGridProps,
  { index, dir }: { index: number; dir: TractDirection },
  size: CSSMeasure
): TemplatedGridProps {
  const sizeForDirProp = dir === "rows" ? "rowSizes" : "colSizes";

  let newSizes: CSSMeasure[] | CSSMeasure | undefined;

  if (dir === "rows") {
    newSizes = template.rowSizes;
  } else {
    newSizes = template.colSizes;
  }

  // If the sizes is a repeated or default value we need to make it an array
  if (!Array.isArray(newSizes)) {
    const filledSize = typeof newSizes === "undefined" ? "1fr" : newSizes;
    const gridDims = matrixDimensions(template.areas);

    newSizes = fillArr(
      filledSize,
      dir === "rows" ? gridDims.numRows : gridDims.numCols
    );
  }

  newSizes[index - 1] = size;

  return {
    ...template,
    [sizeForDirProp]: newSizes,
  };
}
