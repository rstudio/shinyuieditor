import { ComponentChildren } from "preact";
import { useCallback } from "preact/hooks";
import { useRecoilState, useRecoilValue } from "recoil";
import { placeOnGridOrCol } from "../../helper-scripts/grid-helpers";
import {
  gridColsAtomFamily,
  gridRowsAtomFamily,
  tractDimsState,
  TractDirection,
  useTractState,
} from "../../state-logic/gridLayoutAtoms";
import { CssUnitInput } from "../CssUnitInput";
import { GridItem } from "../GridItem";
import { SvgIcon } from "../Icons";
import classes from "./style.module.css";

type TractPlacement = {
  dir: TractDirection;
  index: number;
};

export function GridTractControls() {
  const { numRows, numCols } = useRecoilValue(tractDimsState);
  return (
    <>
      <TractAddButton dir={"rows"} index={-1} />
      {Array.from({ length: numRows }, (_, i) => (
        <>
          <TractSizer dir={"rows"} index={i} />
          <TractAddButton dir={"rows"} index={i} />
        </>
      ))}
      <TractAddButton dir={"cols"} index={-1} />
      {Array.from({ length: numCols }, (_, i) => (
        <>
          <TractSizer dir={"cols"} index={i} />
          <TractAddButton dir={"cols"} index={i} />
        </>
      ))}
    </>
  );
}

function TractSizer({ dir, index }: TractPlacement) {
  const [value, setValue] = useRecoilState(
    dir === "rows" ? gridRowsAtomFamily(index) : gridColsAtomFamily(index)
  );
  return (
    <TractGutter dir={dir} index={index}>
      <CssUnitInput value={value} onChange={(newVal) => setValue(newVal)} />
    </TractGutter>
  );
}

function TractAddButton({ dir, index }: TractPlacement) {
  const isFirstTract = index === -1;

  const tractState = useTractState(dir);
  const onClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      // the tract is positioned before the tract it may add
      tractState.add("1fr", index + 1);
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
