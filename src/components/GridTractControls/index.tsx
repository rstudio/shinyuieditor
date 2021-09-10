import { ComponentChildren } from "preact";
import { useCallback } from "preact/hooks";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  enumerateGridDims,
  placeOnGridOrCol,
} from "../../helper-scripts/grid-helpers";
import type {
  GridTractAtom,
  GridTractAtomFamily,
  GridTractDimsState,
  TractPosition,
} from "../../state-logic/gridLayout/atoms";
import { useAddTract } from "../../state-logic/gridLayout/hooks";
import { CssUnitInput } from "../CssUnitInput";
import { GridItem } from "../GridItem";
import { SvgIcon } from "../Icons";
import classes from "./style.module.css";

export function GridTractControls({
  tractDimsState,
  rowsAtomFamily,
  colsAtomFamily,
}: {
  tractDimsState: GridTractDimsState;
  rowsAtomFamily: GridTractAtomFamily;
  colsAtomFamily: GridTractAtomFamily;
}) {
  const { numRows, numCols } = useRecoilValue(tractDimsState);
  return (
    <>
      <TractAddButton dir={"rows"} index={-1} />
      {Array.from({ length: numRows }, (_, i) => (
        <>
          <TractSizer dir={"rows"} index={i} tractAtom={rowsAtomFamily(i)} />
          <TractAddButton dir={"rows"} index={i} />
          {i < numRows - 1 ? <TractBoundary dir="rows" index={i} /> : null}
        </>
      ))}
      <TractAddButton dir={"cols"} index={-1} />
      {Array.from({ length: numCols }, (_, i) => (
        <>
          <TractSizer dir={"cols"} index={i} tractAtom={colsAtomFamily(i)} />
          <TractAddButton dir={"cols"} index={i} />
          {i < numCols - 1 ? <TractBoundary dir="cols" index={i} /> : null}
        </>
      ))}
      {enumerateGridDims({ numRows, numCols }).map(({ row, col }) => {
        return <GridCell key={{ row, col }} row={row} col={col} />;
      })}
    </>
  );
}

function TractSizer({
  dir,
  index,
  tractAtom,
}: TractPosition & { tractAtom: GridTractAtom }) {
  const [value, setValue] = useRecoilState(tractAtom);
  return (
    <TractGutter dir={dir} index={index}>
      <CssUnitInput value={value} onChange={(newVal) => setValue(newVal)} />
    </TractGutter>
  );
}

function TractAddButton({ dir, index }: TractPosition) {
  const isFirstTract = index === -1;

  const addTract = useAddTract(dir);

  const onClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      // the tract is positioned before the tract it may add
      addTract("1fr", index + 1);
    },
    [dir, index]
  );
  return (
    <TractGutter dir={dir} index={isFirstTract ? 0 : index}>
      <button
        className={
          classes.addTractButton +
          (isFirstTract ? ` ${classes.firstTractButton}` : "")
        }
        onMouseDown={preventMouseDownPropigation}
        onClick={onClick}
      >
        <SvgIcon name={"plus"} />
      </button>
    </TractGutter>
  );
}

function TractGutter({
  dir,
  index,
  children,
}: TractPosition & { children: ComponentChildren }) {
  const className =
    dir === "rows" ? classes.rowSizeControls : classes.colSizeControls;

  return (
    <GridItem
      key={dir + index}
      {...placeOnGridOrCol({ index, dir })}
      className={className}
    >
      {children}
    </GridItem>
  );
}

function TractBoundary({ dir, index }: TractPosition) {
  const boundaryClass =
    classes[dir === "cols" ? "colTractBoundary" : "rowTractBoundary"];

  return (
    <GridItem
      key={dir + index}
      className={boundaryClass}
      {...placeOnGridOrCol({ dir, index })}
    />
  );
}

function GridCell(pos: { row: number; col: number }) {
  const { row, col } = pos;

  return (
    <div
      className={"gridCell"}
      style={{
        gridRow: row,
        gridColumn: col,
        // So the cell doesn't intercept element interactions like dragging
        pointerEvents: "none",
      }}
      key={{ row, col }}
      data-row={row}
      data-col={col}
    />
  );
}

function preventMouseDownPropigation(e: MouseEvent) {
  e.stopPropagation();
}
