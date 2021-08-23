import { memo } from "preact/compat";

let GridCells = ({
  numCols,
  numRows,
}: {
  numCols: number;
  numRows: number;
}) => {
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
