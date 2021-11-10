import debounce from "just-debounce-it";
import React from "react";
import { toStringLoc } from "utils/grid-helpers";
import { getBBoxOfDiv } from "utils/overlap-helpers";
import { CellLocRef } from "./index";

export function GridCell({
  gridRow,
  gridColumn,
  cellLocations,
}: {
  gridRow: number;
  gridColumn: number;
  cellLocations: CellLocRef;
}) {
  const gridPos = toStringLoc({ row: gridRow, col: gridColumn });
  const cellRef = React.useRef<HTMLDivElement>(null);

  const updateSize = React.useMemo(
    () =>
      debounce(() => {
        console.log(`Gathering size for ${gridPos}`);
        cellLocations.current[gridPos] = getBBoxOfDiv(cellRef.current);
      }, 500),
    [cellLocations, gridPos]
  );

  React.useEffect(() => {
    const currentCell = cellRef.current;
    const ro = new ResizeObserver((entries) => {
      for (let _ of entries) {
        updateSize();
      }
    });

    if (currentCell) ro.observe(currentCell);

    updateSize();
    return () => {
      console.log(`Removing resize listener for grid cell ${gridPos}`);
      ro.disconnect();
    };
  }, [gridPos, updateSize]);

  return (
    <div
      ref={cellRef}
      style={{
        gridRow,
        gridColumn,
        backgroundColor: "var(--light-grey, pink)",
      }}
    >
      {gridRow}-{gridColumn}
    </div>
  );
}
