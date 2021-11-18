import { GridCellBounds } from "components/shiny-ui/GridEditor";
import { buildRange } from "utils/array-helpers";
import { toStringLoc } from "utils/grid-helpers";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";
import { MovementType } from "../../components/shiny-ui/GridEditor/availableMoves";
import {
  boundingBoxToExtent,
  gridLocationToExtent,
} from "../../components/shiny-ui/GridEditor/helpers";
import { emptyCell } from "./itemLocations";

type TractBounds = [number, number];
type TractRegion =
  | {
      searchDir: "rows";
      rowBounds: TractBounds | null;
    }
  | {
      searchDir: "cols";
      colBounds: TractBounds | null;
    };

export function findAvailableTracts({
  side,
  gridLocation,
  layoutAreas,
}: {
  side: MovementType;
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
}): TractRegion {
  const { rowStart, rowEnd, colStart, colEnd } = gridLocationToExtent(
    gridLocation
  );

  let searchDir: TractRegion["searchDir"] = side.match(/down|up/)
    ? "rows"
    : "cols";
  let rowBounds: TractBounds | null = [rowStart, rowEnd];
  let colBounds: TractBounds | null = [colStart, colEnd];

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
  if (rowBounds === null) {
    return { searchDir: "rows", rowBounds: null };
  }
  if (colBounds === null) {
    return { searchDir: "cols", colBounds: null };
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
        break;
      }
    }
    return { searchDir, rowBounds };
  }
  if (searchDir === "cols") {
    const itemRowRange = buildRange(...rowBounds);
    for (let colIndex of buildRange(...colBounds)) {
      const otherItemInCol = itemRowRange.some((rowIndex) =>
        cellHasItem(rowIndex, colIndex)
      );
      if (otherItemInCol) {
        colBounds[1] = colIndex - 1;
        break;
      }
    }
    return { searchDir, colBounds };
  }

  throw new Error("How'd you get here?");
}

export function getExtentsForAvailableTracts({
  side,
  gridLocation,
  layoutAreas,
  cellBounds,
}: {
  side: MovementType;
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
  cellBounds: GridCellBounds;
}): {
  maxExtent: number;
  extents: {
    index: number;
    start: number;
    end: number;
  }[];
} {
  const availableTracts = findAvailableTracts({
    side,
    gridLocation,
    layoutAreas,
  });

  let extents: {
    index: number;
    start: number;
    end: number;
  }[];

  if (availableTracts.searchDir === "rows") {
    if (availableTracts.rowBounds === null) throw new Error(cantExpandError);

    extents = buildRange(...availableTracts.rowBounds).map((rowIndex) => {
      const bounds = getCellExtents({ rowIndex }, cellBounds);

      return side === "expand down"
        ? { index: rowIndex, start: bounds.top, end: bounds.bottom }
        : { index: rowIndex, start: bounds.bottom, end: bounds.top };
    });
  } else {
    if (availableTracts.colBounds === null) throw new Error(cantExpandError);

    extents = buildRange(...availableTracts.colBounds).map((colIndex) => {
      const bounds = getCellExtents({ colIndex }, cellBounds);

      return side === "expand right"
        ? { index: colIndex, start: bounds.left, end: bounds.right }
        : { index: colIndex, start: bounds.right, end: bounds.left };
    });
  }

  return {
    maxExtent: extents[extents.length - 1].end,
    extents,
  };
}

function getCellExtents(
  {
    rowIndex: row = 1,
    colIndex: col = 1,
  }: {
    rowIndex?: number;
    colIndex?: number;
  },
  cellBounds: GridCellBounds
) {
  return boundingBoxToExtent(cellBounds[toStringLoc({ row, col })]);
}
const cantExpandError =
  "Can't check expansion room for an item that can't be expanded";
