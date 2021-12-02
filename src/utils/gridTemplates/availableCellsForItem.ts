import { GridCellBounds } from "components/shiny-ui/GridEditor";
import { DragDirection } from "components/shiny-ui/GridEditor/useResizeOnDrag";
import { buildRange } from "utils/array-helpers";
import { toStringLoc } from "utils/grid-helpers";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";
import { boundingBoxToExtent } from "../../components/shiny-ui/GridEditor/helpers";
import { findAvailableTracts } from "./findAvailableTracts";

export function getExtentsForAvailableTracts({
  dragDirection,
  gridLocation,
  layoutAreas,
  cellBounds,
}: {
  dragDirection: DragDirection;
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
    dragDirection,
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

      return dragDirection === "down"
        ? { index: rowIndex, start: bounds.top, end: bounds.bottom }
        : { index: rowIndex, start: bounds.bottom, end: bounds.top };
    });
  } else {
    if (availableTracts.colBounds === null) throw new Error(cantExpandError);

    extents = buildRange(...availableTracts.colBounds).map((colIndex) => {
      const bounds = getCellExtents({ colIndex }, cellBounds);

      return dragDirection === "right"
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
