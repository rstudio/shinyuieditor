import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import type { TractDirection } from "components/Shiny-Ui-Elements/GridlayoutGridPage/helpers";
import { joinPretty, removeAtIndex } from "utils/array-helpers";
import { removeRowOrCol } from "utils/matrix-helpers";

import { areasToItemLocations } from "./itemLocations";
import { itemBoundsInDir } from "./itemLocationToBounds";

export default function removeTract(
  template: TemplatedGridProps,
  tract: { index: number; dir: TractDirection },
  force: boolean = false
): TemplatedGridProps {
  const { dir, index } = tract;
  // Convert to the 0-indexed matrix dimensions
  const indexOfTract = tract.index - 1;

  // If we're not forcing removal, make sure removal is valid
  if (!force) {
    const itemsInTract = conflictsToRemoveTract(template.areas, tract);
    if (itemsInTract.length !== 0) {
      throw new Error(
        `Can't remove ${
          dir === "rows" ? "row" : "col"
        } ${index} as items ${joinPretty(
          itemsInTract
        )} are entirely contained within it.`
      );
    }
  }

  const updates: Partial<TemplatedGridProps> = {
    areas: removeRowOrCol(template.areas, { index: indexOfTract, dir }),
  };

  // If the sizes are a single repeated size than we just leave it, otherwise
  // we need to take out the corresponding size for this tract
  const sizeForDirProp = dir === "rows" ? "rowSizes" : "colSizes";
  if (isRepeatedSize(template[sizeForDirProp])) {
    updates[sizeForDirProp] = removeAtIndex(
      template[sizeForDirProp],
      indexOfTract
    );
  }

  return {
    ...template,
    ...updates,
  };
}

export function conflictsToRemoveTract(
  areas: TemplatedGridProps["areas"],
  tract: { index: number; dir: TractDirection }
): string[] {
  // Make sure no items are entirely contained within the removed tract
  const items = areasToItemLocations(areas);

  // If we're not forcing removal, make sure removal is valid
  return itemsContainedInTract(items, tract);
}

/**
 * Checks if row or column size definition is meant to just be repeated
 *
 * A "repeated" size is single length or non present.
 * E.g. colSizes = "1fr", ["1fr"], undefined
 */
function isRepeatedSize(
  tractSizes: TemplatedGridProps["colSizes"] | TemplatedGridProps["rowSizes"]
): boolean {
  return Array.isArray(tractSizes) && tractSizes.length > 1;
}

/**
 * Checks a given tract entirely contains a given item
 *
 * This means that if the tract is removed those items will be removed as well
 */
function itemsContainedInTract(
  items: ReturnType<typeof areasToItemLocations>,
  { index, dir }: { index: number; dir: TractDirection }
): string[] {
  let inTract: string[] = [];
  items.forEach((item, itemName) => {
    const { itemStart, itemEnd } = itemBoundsInDir(item, dir);

    if (itemStart === index && itemStart === itemEnd) {
      inTract.push(itemName);
    }
  });
  return inTract;
}
