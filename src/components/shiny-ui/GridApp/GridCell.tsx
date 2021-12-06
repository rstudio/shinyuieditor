import { IconButton } from "@chakra-ui/button";
import debounce from "just-debounce-it";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { enumerateGridDims, toStringLoc } from "utils/grid-helpers";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { getBBoxOfDiv } from "utils/overlap-helpers";
import { CellLocRef } from "../GridApp";

function GridCell({
  gridRow,
  gridColumn,
  cellLocations,
  onClick,
}: {
  gridRow: number;
  gridColumn: number;
  cellLocations: CellLocRef;
  onClick?: ({ row, col }: { row: number; col: number }) => void;
}) {
  const gridPos = toStringLoc({ row: gridRow, col: gridColumn });
  const cellRef = React.useRef<HTMLDivElement>(null);
  const isClickable = typeof onClick !== "undefined";

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
    // Test environment is node and thus doesn't have access to ResizeObserver
    if (typeof ResizeObserver === "undefined") return;

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
      className="grid-cell"
      ref={cellRef}
      style={{
        gridRow,
        gridColumn,
        backgroundColor: "var(--light-grey, pink)",
        opacity: 0.2,
        display: "grid",
        placeContent: "center",
      }}
    >
      {isClickable ? (
        <IconButton
          icon={<FaPlus />}
          aria-label={`Add new item at row ${gridRow} column ${gridColumn}`}
          onClick={() => onClick({ row: gridRow, col: gridColumn })}
        />
      ) : null}
    </div>
  );
}

export function GridCells({
  numRows,
  numCols,
  cellLocRef,
  onClick,
}: Pick<ReturnType<typeof parseGridTemplateAreas>, "numCols" | "numRows"> & {
  cellLocRef: CellLocRef;
  onClick?: ({ row, col }: { row: number; col: number }) => void;
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
          onClick={onClick}
        />
      ))}
    </>
  );
}
