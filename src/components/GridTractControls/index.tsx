import { memo, useCallback, useMemo } from "preact/compat";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
  const position = useMemo(
    () =>
      dir === "rows"
        ? {
            startRow: index + 1,
            startCol: 1,
            endCol: -1,
            className: classes.rowSizeControls,
          }
        : {
            startCol: index + 1,
            startRow: 1,
            endRow: -1,
            className: classes.colSizeControls,
          },
    [dir, index]
  );

  return (
    <GridItem {...position}>
      <CssUnitInput value={value} onChange={updateTract} />
    </GridItem>
  );
}
