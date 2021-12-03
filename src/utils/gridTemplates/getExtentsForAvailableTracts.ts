import { GridCellBounds } from "components/shiny-ui/GridEditor";
import { DragDirection } from "components/shiny-ui/GridEditor/useResizeOnDrag";
import { buildRange } from "utils/array-helpers";
import { toStringLoc } from "utils/grid-helpers";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";
import { boundingBoxToExtent } from "../../components/shiny-ui/GridEditor/helpers";
import findAvailableTracts from "./findAvailableTracts";

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
  const { shrinkExtent, growExtent } = findAvailableTracts({
    dragDirection,
    gridLocation,
    layoutAreas,
  });

  const extents = buildRange(shrinkExtent, growExtent).map((index) =>
    getExtents({ dragDirection, index, cellBounds })
  );

  return {
    maxExtent: extents[extents.length - 1].end,
    extents,
  };
}

function getExtents({
  dragDirection,
  index,
  cellBounds,
}: {
  dragDirection: DragDirection;
  index: number;
  cellBounds: GridCellBounds;
}) {
  const boxPosition =
    dragDirection === "up" || dragDirection === "down"
      ? { row: index, col: 1 }
      : { col: index, row: 1 };

  const { top, bottom, left, right } = boundingBoxToExtent(
    cellBounds[toStringLoc(boxPosition)]
  );

  switch (dragDirection) {
    case "up":
      return { index, start: bottom, end: top };
    case "down":
      return { index, start: top, end: bottom };
    case "left":
      return { index, start: right, end: left };
    case "right":
      return { index, start: left, end: right };
  }
}
