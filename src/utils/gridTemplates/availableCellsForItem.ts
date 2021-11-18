import { buildRange } from "utils/array-helpers";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";
import { MovementType } from "../../components/shiny-ui/GridEditor/availableMoves";
import { gridLocationToExtent } from "../../components/shiny-ui/GridEditor/helpers";
import { emptyCell } from "./itemLocations";

type CellRegion =
  | {
      searchDir: "rows";
      rowBounds: [number, number] | null;
      colBounds: [number, number];
    }
  | {
      searchDir: "cols";
      rowBounds: [number, number];
      colBounds: [number, number] | null;
    };

export function availableCellsForItem({
  side,
  gridLocation,
  layoutAreas,
}: {
  side: MovementType;
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
}) {
  const { rowStart, rowEnd, colStart, colEnd } = gridLocationToExtent(
    gridLocation
  );

  let searchDir: CellRegion["searchDir"] = side.match(/down|up/)
    ? "rows"
    : "cols";
  let rowBounds: CellRegion["rowBounds"] = [rowStart, rowEnd];
  let colBounds: CellRegion["colBounds"] = [colStart, colEnd];

  const numRows = layoutAreas.length;
  const numCols = layoutAreas[0].length;

  switch (side) {
    case "expand down":
      rowBounds = rowEnd < numRows ? [rowEnd + 1, numRows] : null;
      break;

    case "expand right":
      colBounds = colEnd < numCols ? [colEnd + 1, numCols] : null;
      break;

    case "expand up":
      rowBounds = rowStart > 1 ? [rowStart - 1, 1] : null;
      break;

    case "expand left":
      colBounds = colStart > 1 ? [colStart - 1, 1] : null;
      break;

    default:
      throw new Error(`Haven't implemented ${side}`);
  }

  if (rowBounds === null || colBounds === null) {
    return { searchDir, rowBounds, colBounds };
  }

  const cellHasItem = (rowIndex: number, colIndex: number) =>
    layoutAreas[rowIndex - 1][colIndex - 1] !== emptyCell;

  if (searchDir === "rows") {
    const itemColRange = buildRange(...colBounds);
    for (let rowIndex of buildRange(...rowBounds)) {
      const otherItemInRow = itemColRange.some((colIndex) =>
        cellHasItem(rowIndex, colIndex)
      );
      if (otherItemInRow) {
        // If we've entered a row with an item, back up bounds and finish
        rowBounds[1] = rowIndex - 1;

        return { searchDir, rowBounds, colBounds };
      }
    }
  }
  if (searchDir === "cols") {
    const itemRowRange = buildRange(...rowBounds);
    for (let colIndex of buildRange(...colBounds)) {
      const otherItemInCol = itemRowRange.some((rowIndex) =>
        cellHasItem(rowIndex, colIndex)
      );
      if (otherItemInCol) {
        colBounds[1] = colIndex - 1;
        return { searchDir, rowBounds, colBounds };
      }
    }
  }

  return { searchDir, rowBounds, colBounds };
}
