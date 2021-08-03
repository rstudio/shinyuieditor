import { CSSMeasure, GridLayoutTemplate, GridTractDir } from "../../types";
import { CssUnitInput } from "../CssUnitInput";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

export const GridTractControls = ({
  rows,
  cols,
  setTract,
}: {
  rows: GridLayoutTemplate["rows"];
  cols: GridLayoutTemplate["cols"];
  setTract: (opts: {
    val: CSSMeasure;
    dir: GridTractDir;
    index: number;
  }) => void;
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
            value={r as CSSMeasure}
            onChange={(newVal: CSSMeasure) => {
              setTract({
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
            value={c as CSSMeasure}
            onChange={(newVal: CSSMeasure) => {
              setTract({
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
