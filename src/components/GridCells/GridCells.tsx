import { useRef } from "preact/compat";
import { useRecoilValue } from "recoil";
import { enumerateGridDims } from "../../helper-scripts/grid-helpers";
import { useGridCellBoundingBoxRecorder } from "../../state-logic/gridItems/hooks";
import type { GridTractDimsState } from "../../state-logic/gridLayout/atoms";

export function GridCells({
  tractDimsState,
}: {
  tractDimsState: GridTractDimsState;
}) {
  const { numRows, numCols } = useRecoilValue(tractDimsState);
  return (
    <>
      {enumerateGridDims({ numRows, numCols }).map(({ row, col }) => {
        return <GridCell key={{ row, col }} row={row} col={col} />;
      })}
    </>
  );
}

function GridCell(pos: { row: number; col: number }) {
  const { row, col } = pos;
  const cellRef = useRef<HTMLDivElement>(null);

  useGridCellBoundingBoxRecorder({ row, col, cellRef });

  return (
    <div
      className={"gridCell"}
      ref={cellRef}
      style={{
        gridRow: row,
        gridColumn: col,
        // Makes sure the cell fill the entire grid area and ignores gap
        margin: "calc(var(--gap)* (-1/2))",
        // So the cell doesn't intercept element interactions like dragging
        pointerEvents: "none",
      }}
      key={{ row, col }}
      data-row={row}
      data-col={col}
    />
  );
}
