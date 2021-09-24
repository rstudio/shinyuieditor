/** @jsxImportSource @emotion/react */
import { Box } from "@chakra-ui/react";
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
import { TractAddButton } from "./TractAddButton";

export default function GridTractControls() {
  const { numRows, numCols } = useRecoilValue(tractDimsState);

  return (
    <>
      {seqArray(numRows + 1).map((i) => (
        <TractAddButton key={"rowAdder" + i} dir={"rows"} index={i} />
      ))}
      {seqArray(numRows - 1).map((i) => (
        <TrackBoundaryLine key={"rowBoundary" + i} dir="rows" index={i} />
      ))}
      {seqArray(numRows).map((i) => (
        <TractSizer
          key={"rows" + i}
          dir="rows"
          index={i}
          tractAtom={gridRowsAtomFamily(i)}
        />
      ))}
      {seqArray(numCols + 1).map((i) => (
        <TractAddButton key={"colAdder" + i} dir={"cols"} index={i} />
      ))}
      {seqArray(numCols - 1).map((i) => (
        <TrackBoundaryLine key={"colBoundary" + i} dir="cols" index={i} />
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

// Putting these values out here because they are chosen at "compile time"
const dividerThickness = 5;
const pad = 10;
const lineThickness = `${dividerThickness}px`;
const lineOffset = `calc(-1/2 * var(--gap) - ${dividerThickness / 2}px)`;
const commonDividerStyles = {
  borderRadius: "var(--corner-radius)",
  backgroundColor: "var(--light-grey)",
};

const ColumnDivider = styled.div({
  height: `calc(100% - var(--card-header-height) - ${2 * pad}px)`,
  marginTop: `calc(var(--card-header-height) + ${pad}px)`,
  width: lineThickness,
  marginRight: lineOffset,
  justifySelf: "end",
  ...commonDividerStyles,
});

const RowDivider = styled.div({
  width: `calc(100% - ${2 * pad}px)`,
  marginLeft: `${pad}px`,
  height: lineThickness,
  marginBottom: lineOffset,
  alignSelf: "end",
  ...commonDividerStyles,
});

function TrackBoundaryLine({ dir, index }: TractPosition) {
  return (
    <TractGutter dir={dir} index={index}>
      {dir === "rows" ? <RowDivider /> : <ColumnDivider />}
    </TractGutter>
  );
}

const rowGutterStyles = {
  marginLeft: `calc(-1 * var(--gap))`,
  width: `calc(100% + 2*var(--gap))`,
  height: "100%",
};
const colGutterStyles = {
  marginTop: `calc(-1 * var(--gap) - var(--card-header-height) )`,
  height: `calc(100% + 2*var(--gap) + var(--card-header-height))`,
  width: "100%",
};
export const TractGutter = styled.div(({ dir, index }: TractPosition) => ({
  display: "grid",
  position: "relative",
  ...placeOnGridOrCol({ dir, index }),
  ...(dir === "rows" ? rowGutterStyles : colGutterStyles),
}));

function TractSizer({
  dir,
  index,
  tractAtom,
}: TractPosition & { tractAtom: GridTractAtom }) {
  const [value, setValue] = useRecoilState(tractAtom);
  const pad = "5px";
  const sizeOfChooser = "125px";

  const placementStyles =
    dir === "rows"
      ? {
          alignSelf: "center",
          marginLeft: `calc(-${pad} - ${sizeOfChooser})`,
        }
      : {
          position: "absolute",
          bottom: `calc(100% + ${pad})`,
          left: `calc(50% - ${sizeOfChooser}/2)`,
        };
  return (
    <TractGutter dir={dir} index={index}>
      <Box sx={placementStyles}>
        <CSSUnitInput
          value={value}
          w={sizeOfChooser}
          onChange={(newVal) => setValue(newVal)}
        />
      </Box>
    </TractGutter>
  );
}
