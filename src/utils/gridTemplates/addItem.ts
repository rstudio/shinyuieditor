import clone from "just-clone";
import { emptyCell } from "./itemLocations";
import { itemLocationToBounds } from "./itemLocationToBounds";
import { ItemLocation, TemplatedGridProps } from "./types";

export default function addItem(
  template: TemplatedGridProps,
  { name, ...item }: ItemLocation & { name: string }
): TemplatedGridProps {
  const { rowStart, rowEnd, colStart, colEnd } = itemLocationToBounds(item);
  const areasCopy = clone(template.areas);

  // i and j are in 0-indexed coordinates where as {row,col}{Start,End} are in
  // grid coordinates, hence the funky bounds math.
  for (let i = 0; i < areasCopy.length; i++) {
    const inItemRowBounds = i >= rowStart - 1 && i < rowEnd;
    for (let j = 0; j < areasCopy[0].length; j++) {
      const existingCell = areasCopy[i][j];
      const existingIsItem = existingCell === name;
      const inItemBounds = inItemRowBounds && j >= colStart - 1 && j < colEnd;

      if (!inItemBounds) {
        // Wipe out any previous entry of this item name if it exists
        if (existingIsItem) areasCopy[i][j] = emptyCell;
        continue;
      }

      if (existingCell !== emptyCell && !existingIsItem)
        throw new Error(
          `Can't add ${name} to layout, overlaps with item ${areasCopy[i][j]}.`
        );
      areasCopy[i][j] = name;
    }
  }

  return { ...template, areas: areasCopy };
}
