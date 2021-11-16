import { CSSMeasure } from "GridTypes";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { TractDirection } from "state-logic/gridLayout/atoms";
import { addTract } from "utils/gridTemplates/addTract";
import { SetLayoutContext } from ".";
import { singular } from "./helpers";
import { TooltipButton } from "./TooltipButton";

export const TractAddButton = ({
  dir,
  tractIndex,
  size,
  beforeOrAfter,
}: {
  dir: TractDirection;
  tractIndex: number;
  size: CSSMeasure;
  beforeOrAfter: "before" | "after";
}) => {
  const setLayout = React.useContext(SetLayoutContext);
  const afterIndex = beforeOrAfter === "before" ? tractIndex - 1 : tractIndex;

  const description = `Add ${singular(dir)} ${beforeOrAfter} ${singular(
    dir
  )} ${tractIndex}`;

  return (
    <TooltipButton
      className={"add-button " + beforeOrAfter}
      popoverText={description}
      popoverPlacement={dir === "rows" ? "left" : "top"}
      aria-label={description}
      onClick={() => {
        setLayout?.((oldLayout) =>
          addTract(oldLayout, { dir, afterIndex, size })
        );
      }}
    >
      <FaPlus />
    </TooltipButton>
  );
};
