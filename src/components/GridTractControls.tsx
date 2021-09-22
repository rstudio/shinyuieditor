/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { placeOnGridOrCol } from "../grid-helpers";
import { tractDimsState, TractPosition } from "../state-logic/gridLayout/atoms";
import { seqArray } from "./general-helpers";

export default function GridTractControls() {
  const { numRows, numCols } = useRecoilValue(tractDimsState);

  return (
    <>
      {seqArray(numRows - 1).map((i) => (
        <TrackBoundaryLine key={"rows" + i} dir="rows" index={i} />
      ))}
      {seqArray(numCols - 1).map((i) => (
        <TrackBoundaryLine key={"cols" + i} dir="cols" index={i} />
      ))}
    </>
  );
}

const TrackBoundaryLine = styled.div(({ dir, index }: TractPosition) => {
  const lineOverhang = "-20px";
  const lineLength = `calc(100% - 2 * ${lineOverhang})`;
  const lineThickness = "4px";
  const offsetToTractCenter = `calc((var(--gap) + ${lineThickness}) / -2)`;

  const dirStyles =
    dir === "rows"
      ? {
          height: lineThickness,
          width: lineLength,
          alignSelf: "end",
          marginLeft: offsetToTractCenter,
          marginBottom: lineOverhang,
        }
      : {
          width: lineThickness,
          height: lineLength,
          justifySelf: "end",
          marginTop: offsetToTractCenter,
          marginRight: lineOverhang,
        };

  return {
    backgroundColor: "var(--light-grey, tomato)",
    borderRadius: "var(--corner-radius, 4px)",
    ...placeOnGridOrCol({ dir, index }),
    ...dirStyles,
  };
});
