import React from "react";

import { useDropHandlers } from "DragAndDropHelpers/useDropHandlers";
import type { GridLocString } from "GridTypes";
import debounce from "just-debounce-it";
import { toStringLoc } from "utils/grid-helpers";
import type { ItemBoundingBox } from "utils/overlap-helpers";
import { getBBoxOfDiv } from "utils/overlap-helpers";

import classes from "./GridCell.module.css";
import type { NewItemInfo } from "./GridlayoutGridPage";

export type GridCellBounds = Record<GridLocString, ItemBoundingBox>;
export type CellLocRef = React.MutableRefObject<GridCellBounds>;

export function GridCell({
  gridRow,
  gridColumn,
  cellLocations,
  onDroppedNode,
}: {
  gridRow: number;
  gridColumn: number;
  cellLocations: CellLocRef;
  onDroppedNode: (nodeInfo: NewItemInfo) => void;
}) {
  const gridPos = toStringLoc({ row: gridRow, col: gridColumn });
  const cellRef = React.useRef<HTMLDivElement>(null);

  useDropHandlers(cellRef, {
    onDrop: (nodeInfo) => {
      // This will eventually filter by element type
      const allowedDrop = true;
      if (!allowedDrop) return;

      onDroppedNode({
        ...nodeInfo,
        pos: {
          rowStart: gridRow,
          rowEnd: gridRow,
          colStart: gridColumn,
          colEnd: gridColumn,
        },
      });
    },
  });

  const updateSize = React.useMemo(
    () =>
      debounce(() => {
        try {
          // The debouncedness of this causes it to fire after cell may have been removed
          cellLocations.current[gridPos] = getBBoxOfDiv(cellRef.current);
        } catch {
          console.error("Failed to get bbox for grid cell");
        }
      }, 500),
    [cellLocations, gridPos]
  );

  React.useEffect(() => {
    // Watch for changes in the size of a given cell and update it's recorded size accordingly.
    // This means we know we're getting up-to-date sizing info for our dragging/moving of
    // elements within the grid.

    // Test environment is node and thus doesn't have access to ResizeObserver
    if (typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => updateSize());

    if (cellRef.current) ro.observe(cellRef.current);

    // Run resize once on load so we dont have to wait for a resize event to have size info
    updateSize();

    return () => ro.disconnect();
  }, [gridPos, updateSize]);

  return (
    <div
      className={`grid-cell ${classes.cell}`}
      ref={cellRef}
      style={{
        gridRow,
        gridColumn,
      }}
    ></div>
  );
}
