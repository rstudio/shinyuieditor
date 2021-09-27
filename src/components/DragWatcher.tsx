/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useRecoilValue } from "recoil";
import { enumerateGridDims } from "../grid-helpers";
import { tractDims } from "../state-logic/gridLayout/atoms";
import { useGridDragger } from "../state-logic/itemDragging";
import { GridItemDiv } from "./GridItemDiv";

export function DragWatcher() {
  const onMouseDown = useGridDragger();

  return (
    <>
      <GridItemDiv
        onMouseDown={onMouseDown}
        startRow={1}
        endRow={-1}
        startCol={1}
        endCol={-1}
        css={{
          padding: "1rem",
          margin: "calc(-1 * var(--main-grid-gap))",
        }}
      />
      <GridCellsMemo />
    </>
  );
}

// These cells are neccesary for the draging to know where it is on the page
// however they're just an implementation details so we leave them in here
// as a non-exported component
function GridCells() {
  const numRows = useRecoilValue(tractDims("rows"));
  const numCols = useRecoilValue(tractDims("cols"));

  return (
    <>
      {enumerateGridDims({ numRows, numCols }).map(({ row, col }) => (
        <div
          key={`Cell-r${row}-c${col}`}
          className="gridCell"
          css={{
            gridRow: row,
            gridColumn: col,
            // So the cell doesn't intercept element interactions like dragging
            pointerEvents: "none",
          }}
          data-row={row}
          data-col={col}
        />
      ))}
    </>
  );
}

const GridCellsMemo = React.memo(GridCells);
