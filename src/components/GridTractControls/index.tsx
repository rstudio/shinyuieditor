import { LayoutUpdateDispatch } from "../../state-logic/layout-updating-logic";
import { CSSMeasure, GridLayoutTemplate } from "../../types";
import { CssUnitInput } from "../CssUnitInput";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

export const GridTractControls = ({
  rows,
  cols,
  updateLayout,
}: {
  rows: GridLayoutTemplate["rows"];
  cols: GridLayoutTemplate["cols"];
  updateLayout: LayoutUpdateDispatch;
}) => {
  return (
    <>
      {rows.map((r, i) => (
        <GridItem
          rows={[i + 1, i + 1]}
          cols={[1, -1]}
          className={classes.rowSizeControls}
        >
          <CssUnitInput
            startValue={r as CSSMeasure}
            onChange={(newVal: CSSMeasure) => {
              updateLayout({
                type: "Change-Tract",
                val: newVal,
                dir: "rows",
                index: i,
              });
            }}
          />
        </GridItem>
      ))}
      {cols.map((c, i) => (
        <GridItem
          rows={[1, -1]}
          cols={[i + 1, i + 1]}
          className={classes.colSizeControls}
        >
          <CssUnitInput
            startValue={c as CSSMeasure}
            onChange={(newVal: CSSMeasure) => {
              updateLayout({
                type: "Change-Tract",
                val: newVal,
                dir: "cols",
                index: i,
              });
            }}
          />
        </GridItem>
      ))}
    </>
  );
};
