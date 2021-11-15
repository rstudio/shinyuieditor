import styled from "@emotion/styled";
import React from "react";
import { FaPlus as PlusIcon } from "react-icons/fa";
import { TractDirection } from "state-logic/gridLayout/atoms";
import { seqArray } from "utils/array-helpers";
import { addTract } from "utils/gridTemplates/addTract";
import { ParsedGridTemplate } from "utils/gridTemplates/parseGridTemplateAreas";
import { SetLayoutContext } from ".";

export const directions: TractDirection[] = ["rows", "cols"];
export function TractAddButtons({
  numCols,
  numRows,
}: Pick<ParsedGridTemplate, "numCols" | "numRows">) {
  const tractButtons: Record<TractDirection, JSX.Element[]> = {
    rows: [],
    cols: [],
  };

  for (let dir of directions) {
    // Need one more button to add a tract before others
    const numButtons = (dir === "rows" ? numRows : numCols) + 1;

    tractButtons[dir] = seqArray(numButtons).map((i) => (
      <TractAddButton key={i} dir={dir} afterIndex={i} size="30px" />
    ));
  }

  return (
    <>
      {tractButtons.rows}
      {tractButtons.cols}
    </>
  );
}
function TractAddButton(tract: Parameters<typeof addTract>[1]) {
  const setLayout = React.useContext(SetLayoutContext);

  const pad = "2px";
  const offsetOutOfGrid = `calc(-1*var(--gap) - ${pad})`;
  const offsetToTractCenter = `calc(-1*var(--gap, 100px))`;
  const { dir, afterIndex, size = "50px" } = tract;

  const firstPosition = afterIndex === 0;
  const placementIndex = firstPosition ? 1 : afterIndex;

  const placement: React.CSSProperties =
    dir === "rows"
      ? {
          gridRow: placementIndex,
          gridColumn: 1,
          alignSelf: firstPosition ? "start" : "end",
          marginLeft: offsetOutOfGrid,
          marginBottom: firstPosition ? "0" : offsetToTractCenter,
        }
      : {
          gridColumn: placementIndex,
          gridRow: 1,
          justifySelf: firstPosition ? "start" : "end",
          marginRight: firstPosition ? "0" : offsetToTractCenter,
          marginTop: offsetOutOfGrid,
        };

  return (
    <SquareButton
      aria-label={`Add ${singular(dir)} after ${singular(dir)} ${afterIndex}`}
      style={placement}
      onClick={() => {
        setLayout?.((oldLayout) =>
          addTract(oldLayout, { dir, afterIndex, size })
        );
      }}
    >
      <PlusIcon />
    </SquareButton>
  );
}
export const SquareButton = styled.button({
  width: "var(--gap, 100px)",
  height: "var(--gap, 100px)",
  display: "grid",
  placeContent: "center",
  color: "var(--light-grey, pink)",
  "&.disabled": {
    cursor: "help",
    opacity: 0.5,
  },
});

export function singular(dir: TractDirection): "row" | "column" {
  return dir === "rows" ? "row" : "column";
}
