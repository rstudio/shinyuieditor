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
  for (let i = rowStart - 1; i < rowEnd; i++) {
    for (let j = colStart - 1; j < colEnd; j++) {
      if (areasCopy[i][j] !== emptyCell)
        throw new Error(
          `Can't add ${name} to layout, overlaps with item ${areasCopy[i][j]}.`
        );
      areasCopy[i][j] = name;
    }
  }

  return { ...template, areas: areasCopy };
}
