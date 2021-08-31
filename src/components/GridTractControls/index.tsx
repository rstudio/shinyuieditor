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

function GridTractControl({
  dir,
  index,
}: {
  dir: TractDirection;
  index: number;
}) {
  const [value, setValue] = useRecoilState(
    dir === "rows" ? gridRowsAtomFamily(index) : gridColsAtomFamily(index)
  );

  const className =
    dir === "rows" ? classes.rowSizeControls : classes.colSizeControls;

  return (
    <GridItem
      key={dir + index}
      {...placeOnGridOrCol({ index, dir })}
      className={className}
    >
      <CssUnitInput value={value} onChange={(newVal) => setValue(newVal)} />
      <TractAddButton dir={dir} index={index + 1} />
    </GridItem>
  );
}

export function GridTractControls() {
  const { numRows, numCols } = useRecoilValue(tractDimsState);
  return (
    <>
      {Array.from({ length: numRows }, (_, i) => (
        <GridTractControl dir="rows" index={i} />
      ))}
      {Array.from({ length: numCols }, (_, i) => (
        <GridTractControl dir="cols" index={i} />
      ))}
    </>
  );
}

function preventMouseDownPropigation(e: MouseEvent) {
  e.stopPropagation();
}

function TractAddButton({
  dir,
  index,
}: {
  dir: TractDirection;
  index: number;
}) {
  const tractState = useTractState(dir);
  const onClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      tractState.add("1fr", index);
    },
    [dir, index]
  );
  return (
    <button
      className={classes.addTractButton}
      onMouseDown={preventMouseDownPropigation}
      onClick={onClick}
    >
      <SvgIcon name={"plus"} />
    </button>
  );
}
