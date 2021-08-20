import { memo } from "preact/compat";
import { LayoutDispatch } from "../../state-logic/layout-updating-logic";
import { CSSMeasure, GridLayoutTemplate } from "../../types";
import { CssUnitInput } from "../CssUnitInput";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

// This memo may need to be made more complex with a comparitor function to
// unpack the rows and columns arrays for comparison, seems to work now though
// but that may be due to me not being strict about imutability in my state
export const GridTractControls = memo(
  ({
    rows,
    cols,
    layoutDispatch,
  }: {
    rows: GridLayoutTemplate["rows"];
    cols: GridLayoutTemplate["cols"];
    layoutDispatch: LayoutDispatch;
  }) => {
    return (
      <>
        {rows.map((r, i) => (
          <GridItem
            key={i}
            rows={[i + 1, i + 1]}
            cols={[1, -1]}
            className={classes.rowSizeControls}
          >
            <CssUnitInput
              value={r as CSSMeasure}
              onChange={(newVal: CSSMeasure) => {
                layoutDispatch({
                  type: "Set-Tract",
                  tract: {
                    val: newVal,
                    dir: "rows",
                    index: i,
                  },
                });
              }}
            />
          </GridItem>
        ))}
        {cols.map((c, i) => (
          <GridItem
            key={i}
            rows={[1, -1]}
            cols={[i + 1, i + 1]}
            className={classes.colSizeControls}
          >
            <CssUnitInput
              value={c as CSSMeasure}
              onChange={(newVal: CSSMeasure) => {
                layoutDispatch({
                  type: "Set-Tract",
                  tract: {
                    val: newVal,

                    dir: "cols",
                    index: i,
                  },
                });
              }}
            />
          </GridItem>
        ))}
      </>
    );
  }
);
