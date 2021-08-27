import { memo, useCallback, useMemo } from "preact/compat";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { placeOnGridOrCol } from "../../helper-scripts/grid-helpers";
import { gridTractsState } from "../../state-logic/recoilAtoms";
import { CSSMeasure } from "../../types";
import { CssUnitInput } from "../CssUnitInput";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

// Memo so we dont rerender on every drag frame
export const GridTractControls = memo(() => {
  const tracts = useRecoilValue(gridTractsState);
  const { rows, cols } = tracts;

  return (
    <>
      {rows.map((r, i) => (
        <GridTractControl
          key={"rows" + i}
          dir={"rows"}
          value={r as CSSMeasure}
          index={i}
        />
      ))}
      {cols.map((c, i) => (
        <GridTractControl
          key={"cols" + i}
          dir={"cols"}
          value={c as CSSMeasure}
          index={i}
        />
      ))}
    </>
  );
});

function GridTractControl({
  dir,
  value,
  index,
}: {
  dir: "rows" | "cols";
  value: CSSMeasure;
  index: number;
}) {
  const setTracts = useSetRecoilState(gridTractsState);

  const updateTract = useCallback(
    (newVal: CSSMeasure) => {
      setTracts(({ rows, cols }: { rows: string[]; cols: string[] }) => {
        const updatedTracts = {
          rows: [...rows],
          cols: [...cols],
        };
        updatedTracts[dir][index] = newVal;
        return updatedTracts;
      });
    },
    [dir, index, setTracts]
  );
  const itemProps = useMemo(
    () => ({
      ...placeOnGridOrCol({ index, dir }),
      className:
        dir === "rows" ? classes.rowSizeControls : classes.colSizeControls,
    }),
    [dir, index]
  );

  return (
    <GridItem {...itemProps}>
      <CssUnitInput value={value} onChange={updateTract} />
    </GridItem>
  );
}
