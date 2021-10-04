import styled from "@emotion/styled";
import { TractGutter } from "components/TractGutter";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { tractDims, TractDirection } from "state-logic/gridLayout/atoms";
import { seqArray } from "utils/general-helpers";

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
export function TractBoundaryLines({ dir }: { dir: TractDirection }) {
  const numTracts = useRecoilValue(tractDims(dir));

  return (
    <>
      {seqArray(numTracts - 1).map((i) => (
        <TractGutter key={dir + "Boundary" + i} dir={dir} index={i}>
          {dir === "rows" ? <RowDivider /> : <ColumnDivider />}
        </TractGutter>
      ))}
    </>
  );
}
