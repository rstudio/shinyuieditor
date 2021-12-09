import { CSSMeasure } from "GridTypes";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { LayoutDispatchContext } from ".";
import { TooltipButton } from "../../../TooltipButton";
import { singular, TractDirection } from "./helpers";

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
  const setLayout = React.useContext(LayoutDispatchContext);
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
        setLayout?.({ type: "ADD_TRACT", dir, afterIndex, size });
      }}
    >
      <FaPlus />
    </TooltipButton>
  );
};
