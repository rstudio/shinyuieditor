import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import type { TractDirection } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import type { CSSMeasure } from "CSSMeasure";
import produce from "immer";
import { addAtIndex, fillArr } from "utils/array-helpers";
import { insertRowOrCol } from "utils/matrix-helpers";

import { areasToItemLocations, emptyCell } from "./itemLocations";
import { itemBoundsInDir } from "./itemLocationToBounds";
import { getTractSizes } from "./parseGridTemplateAreas";

export type NewTract = {
  afterIndex: number;
  size: CSSMeasure;
  dir: TractDirection;
};

export default function addTract(
  originalTemplate: TemplatedGridProps,
  { afterIndex, size, dir }: NewTract
): TemplatedGridProps {
  return produce(originalTemplate, (template) => {
    const offDir = dir === "rows" ? "cols" : "rows";
    const currentSizes = getTractSizes(template);

    if (afterIndex > currentSizes[dir].length)
      throw new Error(
        `Can't add a tract after index ${afterIndex}. Not enought tracts.`
      );

    if (afterIndex < 0) throw new Error(`Cant add a tract at a negative index`);

    const items = areasToItemLocations(template.areas);

    let addedTract = fillArr(emptyCell, currentSizes[offDir].length);

    // Check if any of the items span the added tract and modify tract if they do
    items.forEach((item, itemName) => {
      const { itemStart, itemEnd } = itemBoundsInDir(item, dir);
      const itemIntersectsTract =
        itemStart <= afterIndex && itemEnd > afterIndex;
      if (itemIntersectsTract) {
        const offDirBounds = itemBoundsInDir(item, offDir);
        for (
          let i = offDirBounds.itemStart - 1;
          i < offDirBounds.itemEnd;
          i++
        ) {
          addedTract[i] = itemName;
        }
      }
    });

    template.areas = insertRowOrCol(template.areas, {
      dir,
      index: afterIndex,
      arr: addedTract,
    });

    template[dir === "rows" ? "rowSizes" : "colSizes"] = addAtIndex(
      currentSizes[dir],
      afterIndex,
      size
    );
  });
}
