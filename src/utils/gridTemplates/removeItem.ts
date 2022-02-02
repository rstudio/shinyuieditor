import produce from "immer";
import { matrixDimensions } from "utils/matrix-helpers";
import { emptyCell } from "./itemLocations";
import { TemplatedGridProps } from "./types";

export default function removeItem(
  originalTemplate: TemplatedGridProps,
  itemName: string
): TemplatedGridProps {
  const { numRows, numCols } = matrixDimensions(originalTemplate.areas);
  return produce(originalTemplate, (template) => {
    const areas = template.areas;
    // i and j are in 0-indexed coordinates where as {row,col}{Start,End} are in
    // grid coordinates, hence the funky bounds math.
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (areas[i][j] === itemName) {
          areas[i][j] = emptyCell;
        }
      }
    }
  });
}
