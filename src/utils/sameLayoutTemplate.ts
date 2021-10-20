import { GridLayoutTemplate } from "GridTypes";
import { sameArray, sameObject } from "./equalityCheckers";

export function sameLayoutTemplate(
  newTemplate: GridLayoutTemplate,
  oldTemplate: GridLayoutTemplate
): boolean {
  // We currently ignore the name property

  // First test rows and columns for differences
  if (!sameArray(newTemplate.rows, oldTemplate.rows)) return false;
  if (!sameArray(newTemplate.cols, oldTemplate.cols)) return false;

  // Next, check gap
  if (newTemplate.gap !== oldTemplate.gap) return false;

  // Next check if the items are all the same, ignoring the absolute position

  // Different number of items
  if (newTemplate.items.length !== oldTemplate.items.length) return false;

  // Loop through all items in the new template
  for (let aItem of newTemplate.items) {
    // Try and find an identical item in the old template
    if (
      oldTemplate.items.findIndex((bItem) =>
        sameObject(aItem, bItem, ["absoluteBounds"])
      ) === -1
    )
      return false;
  }

  return true;
}
