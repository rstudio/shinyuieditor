import { memo } from "preact/compat";
import { useRecoilState } from "recoil";
import {
  gridTractsState,
  updateTract,
} from "../../state-logic/layout-updating-logic";
import { CSSMeasure } from "../../types";
import { CssUnitInput } from "../CssUnitInput";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

// Memo so we dont rerender on every drag frame
export const GridTractControls = memo(() => {
  const [tracts, setTracts] = useRecoilState(gridTractsState);
  const { rows, cols } = tracts;
  return (
    <>
      {rows.map((r, i) => (
        <GridItem
          key={i}
          startRow={i + 1}
          startCol={1}
          endCol={-1}
          className={classes.rowSizeControls}
        >
          <CssUnitInput
            value={r as CSSMeasure}
            onChange={(newVal: CSSMeasure) => {
              updateTract(setTracts, {
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
          key={i}
          startRow={1}
          endRow={-1}
          startCol={i + 1}
          className={classes.colSizeControls}
        >
          <CssUnitInput
            value={c as CSSMeasure}
            onChange={(newVal: CSSMeasure) => {
              updateTract(setTracts, {
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
});
