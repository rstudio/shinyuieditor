import { useRecoilValue } from "recoil";
import { placeOnGridOrCol } from "../../helper-scripts/grid-helpers";
import {
  TractCountsAtom,
  TractDirection,
} from "../../state-logic/gridLayout/atoms";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

export function TractBoundaries({
  dir,
  countsAtom,
}: {
  dir: TractDirection;
  countsAtom: TractCountsAtom;
}) {
  const tractCount = useRecoilValue(countsAtom);
  const boundaryClass =
    classes[dir === "cols" ? "colTractBoundary" : "rowTractBoundary"];

  return (
    <>
      {Array.from({ length: tractCount - 1 }, (_, index) => (
        <GridItem
          key={`${dir}-${index}`}
          className={boundaryClass}
          {...placeOnGridOrCol({ dir, index })}
        />
      ))}
    </>
  );
}
