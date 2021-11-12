import debounce from "just-debounce-it";
import React from "react";
import { enumerateGridDims, toStringLoc } from "utils/grid-helpers";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { getBBoxOfDiv } from "utils/overlap-helpers";
import { CellLocRef } from "./index";

function GridCell({
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
        opacity: 0.2,
      }}
    >
      {gridRow}-{gridColumn}
    </div>
  );
}

export function GridCells({
  numRows,
  numCols,
  cellLocRef,
}: Pick<ReturnType<typeof parseGridTemplateAreas>, "numCols" | "numRows"> & {
  cellLocRef: CellLocRef;
}) {
  return (
    <>
      {enumerateGridDims({
        numRows,
        numCols,
      }).map(({ row, col }) => (
        <GridCell
          key={toStringLoc({ row, col })}
          gridRow={row}
          gridColumn={col}
          cellLocations={cellLocRef}
        />
      ))}
    </>
  );
}
