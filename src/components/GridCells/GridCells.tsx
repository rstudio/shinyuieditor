import { memo } from "preact/compat";
import type { GridLayoutDef } from "../../types";

let GridCells = ({
  cols,
  rows,
}: {
  cols: GridLayoutDef["cols"];
  rows: GridLayoutDef["rows"];
}) => {
  const numCols = cols?.length ?? 1;
  const numRows = rows?.length ?? 1;

  return (
    <>
      {Array.from({ length: numCols * numRows }).map((_, i) => {
        const col = (i % numCols) + 1;
        const row = Math.floor(i / numCols) + 1;
        return (
          <div
            className={"gridCell"}
            style={{
              gridRow: row,
              gridColumn: col,
              // Makes sure the cell fill the entire grid area and ignores gap
              margin: "calc(var(--gap)* (-1/2))",
            }}
            key={{ row, col }}
            data-row={row}
            data-col={col}
          />
        );
      })}
    </>
  );
};

GridCells = memo(GridCells);
export { GridCells };
