import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import type { TractDirection } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import type { CSSMeasure } from "CSSMeasure";
import produce from "immer";

export default function resizeTract(
  templateOriginal: TemplatedGridProps,
  { index, dir }: { index: number; dir: TractDirection },
  size: CSSMeasure
): TemplatedGridProps {
  return produce(templateOriginal, (template) => {
    const tractProp = dir === "rows" ? "rowSizes" : "colSizes";

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
