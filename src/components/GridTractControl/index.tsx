import { useContext } from "preact/hooks";
import {
  LayoutDispatch,
  LayoutUpdateDispatch,
} from "../../layout-updating-logic";
import { CSSMeasure, TractValue } from "../../types";
import { CssUnitInput } from "../CssUnitInput";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

export const GridTractControl = ({ val, dir, index }: TractValue) => {
  const layoutDispatch = useContext(LayoutDispatch) as LayoutUpdateDispatch;
  const gridI = index + 1;
  const isRows = dir === "rows";
  return (
    <GridItem
      rows={isRows ? [gridI, gridI] : [1, -1]}
      cols={isRows ? [1, -1] : [gridI, gridI]}
      className={isRows ? classes.rowSizeControls : classes.colSizeControls}
    >
      <CssUnitInput
        startValue={val as CSSMeasure}
        onChange={(newVal: CSSMeasure) => {
          layoutDispatch({
            type: "Change-Tract",
            val: newVal,
            dir,
            index,
          });
        }}
      />
    </GridItem>
  );
};
