import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import { placeOnGridOrCol } from "../../helper-scripts/grid-helpers";
import {
  gridColsAtomFamily,
  gridRowsAtomFamily,
  tractDimsState,
} from "../../state-logic/gridLayoutAtoms";
import { CSSMeasure } from "../../types";
import { CssUnitInput } from "../CssUnitInput";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

export function GridTractControls() {
  const { numRows, numCols } = useRecoilValue(tractDimsState);
  return (
    <>
      {Array.from({ length: numRows }, (_, i) => (
        <RowTractControl index={i} />
      ))}
      {Array.from({ length: numCols }, (_, i) => (
        <ColTractControl index={i} />
      ))}
    </>
  );
}

function ColTractControl({ index }: { index: number }) {
  const [value, setValue] = useRecoilState(gridColsAtomFamily(index));

  return (
    <GridTractControl
      dir="cols"
      index={index}
      value={value}
      setValue={setValue}
    />
  );
}

function RowTractControl({ index }: { index: number }) {
  const [value, setValue] = useRecoilState(gridRowsAtomFamily(index));

  return (
    <GridTractControl
      dir="rows"
      index={index}
      value={value}
      setValue={setValue}
    />
  );
}

function GridTractControl({
  dir,
  index,
  value,
  setValue,
}: {
  dir: "rows" | "cols";
  index: number;
  value: CSSMeasure;
  setValue: SetterOrUpdater<CSSMeasure>;
}) {
  const className =
    dir === "rows" ? classes.rowSizeControls : classes.colSizeControls;

  return (
    <GridItem
      key={dir + index}
      {...placeOnGridOrCol({ index, dir })}
      className={className}
    >
      <CssUnitInput value={value} onChange={(newVal) => setValue(newVal)} />
    </GridItem>
  );
}
