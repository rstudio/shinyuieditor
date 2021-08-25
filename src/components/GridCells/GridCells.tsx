import { memo, useRef } from "preact/compat";
import { useSetRecoilState } from "recoil";
import {
  gridCellBoundingBoxState,
  useGridItemBoundingBoxRecorder,
} from "../../state-logic/gridItems";

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
        return <GridCell key={{ row, col }} row={row} col={col} />;
      })}
    </>
  );
};

GridCells = memo(GridCells);
export { GridCells };

function GridCell(pos: { row: number; col: number }) {
  const { row, col } = pos;
  const cellRef = useRef<HTMLDivElement>(null);
  const setBoundingBox = useSetRecoilState(gridCellBoundingBoxState(pos));

  useGridItemBoundingBoxRecorder({
    itemRef: cellRef,
    startRow: row,
    startCol: col,
    setBoundingBox,
    debugName: `cell<${row},${col}>`,
  });

  return (
    <div
      className={"gridCell"}
      ref={cellRef}
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
}
