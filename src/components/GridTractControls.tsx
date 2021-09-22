/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { placeOnGridOrCol } from "../grid-helpers";
import {
  gridColsAtomFamily,
  gridRowsAtomFamily,
  GridTractAtom,
  tractDimsState,
  TractPosition,
} from "../state-logic/gridLayout/atoms";
import { CSSUnitInput } from "./CSSUnitInput";
import { seqArray } from "./general-helpers";

export default function GridTractControls() {
  const { numRows, numCols } = useRecoilValue(tractDimsState);

  return (
    <>
      {seqArray(numRows - 1).map((i) => (
        <TrackBoundaryLine key={"rows" + i} dir="rows" index={i} />
      ))}
      {seqArray(numRows).map((i) => (
        <TractSizer
          key={"rows" + i}
          dir="rows"
          index={i}
          tractAtom={gridRowsAtomFamily(i)}
        />
      ))}
      {seqArray(numCols - 1).map((i) => (
        <TrackBoundaryLine key={"cols" + i} dir="cols" index={i} />
      ))}
      {seqArray(numCols).map((i) => (
        <TractSizer
          key={"cols" + i}
          dir="cols"
          index={i}
          tractAtom={gridColsAtomFamily(i)}
        />
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

const TractGutter = styled.div(({ dir, index }: TractPosition) => {
  const size = "20px";

  const dirStyles =
    dir === "rows"
      ? {
          alignSelf: "center",
          marginLeft: `calc(-1 * (${size} + var(--gap)))`,
          alignContent: "center",
          justifyContent: "end",
          height: "100%",
          width: size,
        }
      : {
          justifySelf: "center",
          width: "100%",
          height: size,
          marginTop: `calc(-1 * (${size} + var(--gap) + var(--card-header-height, 35px)))`,
          justifyContent: "center",
          alignContent: "end",
        };

  return {
    display: "grid",
    position: "relative",
    ...placeOnGridOrCol({ dir, index }),
    ...dirStyles,
  };
});

function TractSizer({
  dir,
  index,
  tractAtom,
}: TractPosition & { tractAtom: GridTractAtom }) {
  const [value, setValue] = useRecoilState(tractAtom);
  return (
    <TractGutter dir={dir} index={index}>
      <CSSUnitInput value={value} onChange={(newVal) => setValue(newVal)} />
    </TractGutter>
  );
}
