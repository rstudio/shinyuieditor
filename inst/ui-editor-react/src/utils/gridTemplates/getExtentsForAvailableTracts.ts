import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import type { GridCellBounds } from "components/Shiny-Ui-Elements/GridlayoutGridPage/GridCell";
import { boundingBoxToExtent } from "components/Shiny-Ui-Elements/GridlayoutGridPage/helpers";
import type { DragDirection } from "components/Shiny-Ui-Elements/GridlayoutGridPage/useResizeOnDrag";
import { buildRange } from "utils/array-helpers";
import { toStringLoc } from "utils/grid-helpers";
import type { ItemLocation } from "utils/gridTemplates/types";
import type { SelectionRect } from "utils/overlap-helpers";

import findAvailableTracts from "./findAvailableTracts";

type TractExtent = {
  index: number;
  start: number;
  end: number;
};
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
  extents: TractExtent[];
} {
  const { shrinkExtent, growExtent } = findAvailableTracts({
    dragDirection,
    gridLocation,
    layoutAreas,
  });

  const searchingRows = dragDirection === "up" || dragDirection === "down";

  const getStartAndEndOfExtent = startAndEndOfExtentForDir[dragDirection];

  const extents = buildRange(shrinkExtent, growExtent).map((index) => {
    const boxPosition = searchingRows
      ? { row: index, col: 1 }
      : { col: index, row: 1 };

    return {
      index,
      ...getStartAndEndOfExtent(
        boundingBoxToExtent(cellBounds[toStringLoc(boxPosition)])
      ),
    };
  });

  return {
    maxExtent: extents[extents.length - 1].end,
    extents,
  };
}

// A map to get the appropriate function for finding the "start" and "end" of
// and box given we are looking at it from a given direction.
// We're doing this separately so the direction conditional doesn't need
// to be evaluated every iteration of our extent finding loop
const startAndEndOfExtentForDir: {
  [key in DragDirection]: (extent: SelectionRect) => {
    start: number;
    end: number;
  };
} = {
  up: ({ bottom, top }) => ({ start: bottom, end: top }),
  down: ({ bottom, top }) => ({ start: top, end: bottom }),
  left: ({ left, right }) => ({ start: right, end: left }),
  right: ({ left, right }) => ({ start: left, end: right }),
};
