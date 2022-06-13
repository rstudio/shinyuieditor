import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import type { TractExtents } from "components/Shiny-Ui-Elements/GridlayoutGridPage/TractExtents";
import type { DragHandle } from "components/Shiny-Ui-Elements/GridlayoutGridPage/useResizeOnDrag";
import type { ItemLocation } from "utils/gridTemplates/types";
import { within } from "utils/within";

import findAvailableTracts from "./findAvailableTracts";

export function getExtentsForAvailableTracts({
  dragDirection,
  gridLocation,
  layoutAreas,
  tractExtents,
}: {
  dragDirection: DragHandle;
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
  tractExtents: TractExtents;
}): TractExtents {
  const { shrinkExtent, growExtent } = findAvailableTracts({
    dragDirection,
    gridLocation,
    layoutAreas,
  });

  const extents = tractExtents.filter(({ index }) =>
    within(index, shrinkExtent, growExtent)
  );

  return extents;
}
