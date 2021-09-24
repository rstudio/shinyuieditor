/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useRecoilValue } from "recoil";
import { CSSMeasure } from "../GridTypes";
import {
  colsState,
  rowsState,
  TractDirection,
} from "../state-logic/gridLayout/atoms";
import { TractAddButtons } from "./TractAddButtons";
import { TractBoundaryLines } from "./TractBoundaryLines";
import { TractSizers } from "./TractSizers";

export default function GridTractControls({ dir }: { dir: TractDirection }) {
  const tracts = useRecoilValue(
    dir === "rows" ? rowsState : colsState
  ) as CSSMeasure[];

  return (
    <>
      <TractAddButtons tracts={tracts} dir={dir} />
      <TractSizers tracts={tracts} dir={dir} />
      <TractBoundaryLines dir={dir} numTracts={tracts.length} />
    </>
  );
}
