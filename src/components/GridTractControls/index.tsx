import { useRecoilState, useRecoilValue } from "recoil";
import { placeOnGridOrCol } from "../../helper-scripts/grid-helpers";
import {
  gridColsAtomFamily,
  gridRowsAtomFamily,
  tractDimsState,
  TractDirection,
} from "../../state-logic/gridLayoutAtoms";
import { CssUnitInput } from "../CssUnitInput";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";
import { SvgIcon } from "../Icons";

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
      <TractAddButton />
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

function TractAddButton() {
  return (
    <button className={classes.addTractButton}>
      <SvgIcon name={"plus"} />
    </button>
  );
}
