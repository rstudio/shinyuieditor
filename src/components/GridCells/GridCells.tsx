import { memo, useRef } from "preact/compat";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { enumerateGridDims } from "../../helper-scripts/grid-helpers";
import { useGridItemBoundingBoxRecorder } from "../../state-logic/gridItems";
import { gridCellBoundingBoxFamily } from "../../state-logic/dragStateAtoms";
import { numColsState, numRowsState } from "../../state-logic/gridLayoutAtoms";

let GridCells = () => {
  const numRows = useRecoilValue(numRowsState);
  const numCols = useRecoilValue(numColsState);
  return (
    <>
      {enumerateGridDims({ numRows, numCols }).map(({ row, col }) => {
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
  const setBoundingBox = useSetRecoilState(gridCellBoundingBoxFamily(pos));

  useGridItemBoundingBoxRecorder({
    itemRef: cellRef,
    startRow: row,
    startCol: col,
    setBoundingBox,
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
