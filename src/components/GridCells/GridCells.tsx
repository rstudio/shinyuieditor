import { memo, useRef } from "preact/compat";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { enumerateGridDims } from "../../helper-scripts/grid-helpers";
import { gridCellBoundingBoxFamily } from "../../state-logic/dragging/atoms";
import { useGridItemBoundingBoxRecorder } from "../../state-logic/gridItems/hooks";
import { tractDimsState } from "../../state-logic/gridLayout/atoms";

let GridCells = () => {
  const { numRows, numCols } = useRecoilValue(tractDimsState);
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
        // So the cell doesn't intercept element interactions like dragging
        pointerEvents: "none",
      }}
      key={{ row, col }}
      data-row={row}
      data-col={col}
    />
  );
}
