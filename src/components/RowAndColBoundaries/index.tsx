import { useRecoilValue } from "recoil";
import { placeOnGridOrCol } from "../../helper-scripts/grid-helpers";
import {
  numTractsState,
  TractDirection,
} from "../../state-logic/gridLayout/atoms";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

export function RowAndColBoundaries() {
  return (
    <>
      <TractBoundaries dir="rows" />
      <TractBoundaries dir="cols" />
    </>
  );
}

function TractBoundaries({ dir }: { dir: TractDirection }) {
  const tractCount = useRecoilValue(numTractsState(dir));
  return (
    <>
      {Array.from({ length: tractCount - 1 }, (_, index) => (
        <TractBoundary index={index} dir={dir} />
      ))}
    </>
  );
}

function TractBoundary(opts: Parameters<typeof placeOnGridOrCol>[0]) {
  const placement = placeOnGridOrCol(opts);
  return (
    <GridItem
      {...placement}
      className={
        opts.dir === "cols"
          ? classes.colTractBoundary
          : classes.rowTractBoundary
      }
    ></GridItem>
  );
}
