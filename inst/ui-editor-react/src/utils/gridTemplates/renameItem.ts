import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import produce from "immer";
import { matrixDimensions } from "utils/matrix-helpers";

/**
 *
 * @param originalTemplate Grid layout template
 * @param oldName Previous name of item
 * @param newName Updated name of item
 * @returns Updated template with the the name of item updated to newName
 */
export function renameItem(
  originalTemplate: TemplatedGridProps,
  oldName: string,
  newName: string
): TemplatedGridProps {
  return produce(originalTemplate, ({ areas }) => {
    const { numRows, numCols } = matrixDimensions(areas);

    // i and j are in 0-indexed coordinates where as {row,col}{Start,End} are in
    // grid coordinates, hence the funky bounds math.
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (areas[i][j] === oldName) {
          areas[i][j] = newName;
        }
      }
    }
  });
}
