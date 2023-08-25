import produce from "immer";
import type { TractDirection } from "util-functions/src/matrix-helpers";

import type { CSSMeasure } from "../../inputFieldTypes";

import type { TemplatedGridProps } from "./TemplatedGridProps";

export function resizeTract(
  templateOriginal: TemplatedGridProps,
  { index, dir }: { index: number; dir: TractDirection },
  size: CSSMeasure
): TemplatedGridProps {
  return produce(templateOriginal, (template) => {
    const tractProp = dir === "rows" ? "row_sizes" : "col_sizes";

    // // If the sizes is a repeated or default value we need to make it an array
    // if (!Array.isArray(template[tractProp])) {
    //   // Completely empty means we give a default value of 1fr
    //   const filledSize = template[tractProp];
    //   const gridDims = matrixDimensions(template.areas);

    //   template[tractProp] = fillArr(
    //     filledSize,
    //     dir === "rows" ? gridDims.numRows : gridDims.numCols
    //   );
    // }

    template[tractProp][index - 1] = size;
  });
}
