import produce from "immer";

import type { TemplatedGridProps } from "../../Shiny-Ui-Elements/Gridlayout/Utils/EditableGridContainer/TemplatedGridProps";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import type { TractDirection } from "../../Shiny-Ui-Elements/Gridlayout/GridlayoutGridPage";

export default function resizeTract(
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
