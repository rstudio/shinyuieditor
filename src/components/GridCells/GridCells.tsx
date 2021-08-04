import type { GridLayoutDef } from "../../types";

export function GridCells({
  cols,
  rows,
}: {
  cols: GridLayoutDef["cols"];
  rows: GridLayoutDef["rows"];
}) {
  const numCols = cols?.length ?? 1;
  const numRows = rows?.length ?? 1;

  return (
    <>
      {Array.from({ length: numCols * numRows }).map((_, i) => {
        const iCol = (i % numCols) + 1;
        const iRow = Math.floor(i / numCols) + 1;
        return (
          <div
            className={"gridCell"}
            style={{
              gridRow: iRow,
              gridColumn: iCol,
              outline: "1px solid tomato",
            }}
            data-row={iRow}
            data-col={iCol}
          />
        );
      })}
    </>
  );
}
