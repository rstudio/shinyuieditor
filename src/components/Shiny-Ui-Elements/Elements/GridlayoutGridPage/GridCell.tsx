import { DragAndDropHandlers } from "components/Shiny-Ui-Elements/UiNode/useDragAndDropElements";
import debounce from "just-debounce-it";
import React from "react";
import { toStringLoc } from "utils/grid-helpers";
import { getBBoxOfDiv } from "utils/overlap-helpers";
import { CellLocRef } from "../../Layouts/GridApp";
import classes from "./GridCell.module.css";

export function GridCell({
  gridRow,
  gridColumn,
  cellLocations,
  ...dropHandlers
}: {
  gridRow: number;
  gridColumn: number;
  cellLocations: CellLocRef;
} & DragAndDropHandlers) {
  const gridPos = toStringLoc({ row: gridRow, col: gridColumn });
  const cellRef = React.useRef<HTMLDivElement>(null);

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
      {...dropHandlers}
    ></div>
  );
}
