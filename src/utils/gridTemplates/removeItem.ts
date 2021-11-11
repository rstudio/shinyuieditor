import clone from "just-clone";
import { matrixDimensions } from "utils/array-helpers";
import { emptyCell } from "./itemLocations";
import { TemplatedGridProps } from "./types";

export default function removeItem(
  template: TemplatedGridProps,
  itemName: string
): TemplatedGridProps {
  const areasCopy = clone(template.areas);

  const { numRows, numCols } = matrixDimensions(template.areas);
  // i and j are in 0-indexed coordinates where as {row,col}{Start,End} are in
  // grid coordinates, hence the funky bounds math.
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (areasCopy[i][j] === itemName) {
        areasCopy[i][j] = emptyCell;
      }
    }
  }

  return { ...template, areas: areasCopy };
}
