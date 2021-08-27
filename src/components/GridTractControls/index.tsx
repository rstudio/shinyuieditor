import { useCallback } from "preact/compat";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { placeOnGridOrCol } from "../../helper-scripts/grid-helpers";
import {
  gridColsState,
  gridRowsState,
  GridTractDefs,
} from "../../state-logic/gridLayoutAtoms";
import { CSSMeasure } from "../../types";
import { CssUnitInput } from "../CssUnitInput";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

export function GridRowsControls() {
  const [rows, setRows] = useRecoilState(gridRowsState);
  return <GridTractControls dir={"rows"} vals={rows} setTractFn={setRows} />;
}

export function GridColsControls() {
  const [cols, setCols] = useRecoilState(gridColsState);
  return <GridTractControls dir={"cols"} vals={cols} setTractFn={setCols} />;
}

function GridTractControls({
  dir,
  vals,
  setTractFn,
}: {
  dir: "rows" | "cols";
  vals: CSSMeasure[];
  setTractFn: SetterOrUpdater<GridTractDefs>;
}) {
  const className =
    dir === "rows" ? classes.rowSizeControls : classes.colSizeControls;

  const updateTract = useCallback((newVal: CSSMeasure, index: number) => {
    setTractFn((oldVals) => {
      const updatedVals = [...oldVals];
      updatedVals[index] = newVal;
      return updatedVals;
    });
  }, []);

  return (
    <>
      {vals.map((val, index) => (
        <GridItem
          key={dir + index}
          {...placeOnGridOrCol({ index, dir })}
          className={className}
        >
          <CssUnitInput
            value={val}
            onChange={(newVal) => updateTract(newVal, index)}
          />
        </GridItem>
      ))}
    </>
  );
}
