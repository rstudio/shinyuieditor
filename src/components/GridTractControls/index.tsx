import { ComponentChildren } from "preact";
import { useCallback } from "preact/hooks";
import { useRecoilState, useRecoilValue } from "recoil";
import { placeOnGridOrCol } from "../../helper-scripts/grid-helpers";
import type {
  GridTractAtom,
  GridTractAtomFamily,
  GridTractDimsState,
  TractDirection,
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
        </>
      ))}
      <TractAddButton dir={"cols"} index={-1} />
      {Array.from({ length: numCols }, (_, i) => (
        <>
          <TractSizer dir={"cols"} index={i} tractAtom={colsAtomFamily(i)} />
          <TractAddButton dir={"cols"} index={i} />
        </>
      ))}
    </>
  );
}

type TractPlacement = {
  dir: TractDirection;
  index: number;
  tractAtom: GridTractAtom;
};

function TractSizer({ dir, index, tractAtom }: TractPlacement) {
  const [value, setValue] = useRecoilState(tractAtom);
  return (
    <TractGutter dir={dir} index={index}>
      <CssUnitInput value={value} onChange={(newVal) => setValue(newVal)} />
    </TractGutter>
  );
}

function TractAddButton({ dir, index }: Omit<TractPlacement, "tractAtom">) {
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
}: {
  dir: TractDirection;
  index: number;
  children: ComponentChildren;
}) {
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

function preventMouseDownPropigation(e: MouseEvent) {
  e.stopPropagation();
}
