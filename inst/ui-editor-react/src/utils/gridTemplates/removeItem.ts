import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import produce from "immer";
import { matrixDimensions } from "utils/matrix-helpers";

import { emptyCell } from "./itemLocations";

function removeItemMutating({ areas }: TemplatedGridProps, itemName: string) {
  const { numRows, numCols } = matrixDimensions(areas);

  // i and j are in 0-indexed coordinates where as {row,col}{Start,End} are in
  // grid coordinates, hence the funky bounds math.
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (areas[i][j] === itemName) {
        areas[i][j] = emptyCell;
      }
    }
  }
}

/**
 *
 * @param originalTemplate Grid layout template
 * @param itemNames Names (or name) of items to be removed from layout
 * @returns Updated template with the itemNames removed from the layout areas
 */
export function removeItems(
  originalTemplate: TemplatedGridProps,
  itemNames: string[] | string
): TemplatedGridProps {
  let namesToRemove = Array.isArray(itemNames) ? itemNames : [itemNames];

  return produce(originalTemplate, (template) => {
    for (let itemName of namesToRemove) {
      removeItemMutating(template, itemName);
    }
  });
}

// This is just the same
export function removeItem(
  originalTemplate: TemplatedGridProps,
  itemName: string
): TemplatedGridProps {
  return removeItems(originalTemplate, itemName);
}
