import produce from "immer";
import { fillArr, addAtIndex } from "util-functions/src/arrays";
import type { TractDirection } from "util-functions/src/matrix-helpers";
import { insertRowOrCol } from "util-functions/src/matrix-helpers";

import type { CSSMeasure } from "../../inputFieldTypes";

import { itemBoundsInDir } from "./itemBoundsInDir";
import { areasToItemLocations, emptyCell } from "./itemLocations";
import { getTractSizes } from "./parseGridTemplateAreas";
import type { TemplatedGridProps } from "./TemplatedGridProps";

type NewTract = {
  afterIndex: number;
  size: CSSMeasure;
  dir: TractDirection;
};

export function addTract(
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

    template[dir === "rows" ? "row_sizes" : "col_sizes"] = addAtIndex(
      currentSizes[dir],
      afterIndex,
      size
    );
  });
}
