import React from "react";
import { FaTrash } from "react-icons/fa";
import { joinPretty } from "utils/array-helpers";
import removeTract from "utils/gridTemplates/removeTract";
import { LayoutDispatchContext } from "../GridApp";
import { TooltipButton } from "../TooltipButton";
import { singular } from "./helpers";

export function TractRemoveButton({
  dir,
  index,
  conflicts,
}: Parameters<typeof removeTract>[1] & { conflicts: string[] }) {
  const setLayout = React.useContext(LayoutDispatchContext);

  const isDisabled = conflicts.length > 0;

  const description = `remove ${singular(dir)} ${index}`;
  const popupText = isDisabled
    ? `Can't ${description} as items ${joinPretty(
        conflicts
      )} are entirely contained within it.`
    : description;

  return (
    <TooltipButton
      popoverText={popupText}
      popoverPlacement={dir === "rows" ? "right" : "bottom"}
      className={isDisabled ? "disabled" : undefined}
      aria-label={description}
      onClick={() => {
        if (isDisabled) return;
        setLayout?.({ type: "REMOVE_TRACT", dir, index });
      }}
    >
      <FaTrash />
    </TooltipButton>
  );
}
