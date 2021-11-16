import React from "react";
import { FaMinus as MinusIcon } from "react-icons/fa";
import { TractDirection } from "state-logic/gridLayout/atoms";
import { joinPretty, seqArray } from "utils/array-helpers";
import { ParsedGridTemplate } from "utils/gridTemplates/parseGridTemplateAreas";
import removeTract, {
  conflictsToRemoveTract,
} from "utils/gridTemplates/removeTract";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { SetLayoutContext } from ".";
import { TooltipButton } from "./TooltipButton";
import { directions, singular } from "./TractAddButtons";

export function TractRemoveButtons({
  areas,
  numCols,
  numRows,
}: Pick<TemplatedGridProps, "areas"> &
  Pick<ParsedGridTemplate, "numCols" | "numRows">) {
  const tractButtons: Record<TractDirection, JSX.Element[]> = {
    rows: [],
    cols: [],
  };

  for (let dir of directions) {
    // Need one more button to add a tract before others
    const numButtons = dir === "rows" ? numRows : numCols;
    tractButtons[dir] = seqArray(numButtons).map((i) => {
      const index = i + 1;
      const conflicts = conflictsToRemoveTract(areas, { dir, index });
      return (
        <TractRemoveButton
          key={index}
          dir={dir}
          index={index}
          conflicts={conflicts}
        />
      );
    });
  }

  return (
    <>
      {tractButtons.rows}
      {tractButtons.cols}
    </>
  );
}

export function TractRemoveButton({
  dir,
  index,
  conflicts,
}: Parameters<typeof removeTract>[1] & { conflicts: string[] }) {
  const setLayout = React.useContext(SetLayoutContext);

  const pad = "2px";
  const offsetOutOfGrid = `calc(-1*var(--gap) - ${pad})`;

  const isDisabled = conflicts.length > 0;
  const placement: React.CSSProperties =
    dir === "rows"
      ? {
          gridRow: index,
          gridColumn: 1,
          alignSelf: "center",
          marginLeft: offsetOutOfGrid,
        }
      : {
          gridColumn: index,
          gridRow: 1,
          justifySelf: "center",
          marginTop: offsetOutOfGrid,
        };

  const description = `remove ${singular(dir)} ${index}`;
  const popupText = isDisabled
    ? `Can't ${description} as items ${joinPretty(
        conflicts
      )} are entirely contained within it.`
    : description;

  return (
    <TooltipButton
      popoverText={popupText}
      className={isDisabled ? "disabled" : undefined}
      aria-label={description}
      style={placement}
      onClick={() => {
        if (isDisabled) return;
        setLayout?.((oldLayout) => removeTract(oldLayout, { dir, index }));
      }}
    >
      <MinusIcon />
    </TooltipButton>
  );
}
