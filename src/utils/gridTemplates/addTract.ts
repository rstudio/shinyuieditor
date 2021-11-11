import { CSSMeasure } from "GridTypes";
import { TractDirection } from "state-logic/gridLayout/atoms";
import { addAtIndex, fillArr, insertRowOrCol } from "utils/array-helpers";
import {
  areasToItemList,
  emptyCell,
  itemBoundsInDir,
} from "./gridTemplateManipulation";
import { getTractSizes } from "./parseGridTemplateAreas";
import { TemplatedGridProps } from "./types";

export function addTract(
  template: TemplatedGridProps,
  {
    afterIndex,
    size,
    dir,
  }: { afterIndex: number; size: CSSMeasure; dir: TractDirection }
): TemplatedGridProps {
  const offDir = dir === "rows" ? "cols" : "rows";
  const currentSizes = getTractSizes(template);

  if (afterIndex > currentSizes[dir].length)
    throw new Error(
      `Can't add a tract after index ${afterIndex}. Not enought tracts.`
    );

  if (afterIndex < 0) throw new Error(`Cant add a tract at a negative index`);

  const items = areasToItemList(template.areas);

  let addedTract = fillArr(emptyCell, currentSizes[offDir].length);

  // Check if any of the items span the added tract and modify tract if they do
  items.forEach((item, itemName) => {
    const { itemStart, itemEnd } = itemBoundsInDir(item, dir);
    const itemIntersectsTract = itemStart <= afterIndex && itemEnd > afterIndex;
    if (itemIntersectsTract) {
      const offDirBounds = itemBoundsInDir(item, offDir);
      for (let i = offDirBounds.itemStart - 1; i < offDirBounds.itemEnd; i++) {
        addedTract[i] = itemName;
      }
    }
  });

  return {
    ...template,
    areas: insertRowOrCol({
      mat: template.areas,
      dir,
      index: afterIndex,
      arr: addedTract,
    }),
    [dir === "rows" ? "rowSizes" : "colSizes"]: addAtIndex(
      currentSizes[dir],
      afterIndex,
      size
    ),
  };
}
