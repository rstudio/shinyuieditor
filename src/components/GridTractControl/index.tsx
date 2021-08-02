import { useLayoutDispatch } from "../../state-logic/layout-updating-logic";
import { CSSMeasure, TractValue } from "../../types";
import { CssUnitInput } from "../CssUnitInput";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

export const GridTractControl = ({ val, dir, index }: TractValue) => {
  const layoutDispatch = useLayoutDispatch();
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
