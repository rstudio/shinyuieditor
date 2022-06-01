import * as React from "react";

import { CSSUnitInputSimple } from "components/Inputs/CSSUnitInput/CSSUnitInputSimple";
import { PopoverButton } from "components/Inputs/PopoverButton";
import type { CSSMeasure, CSSUnits } from "CSSMeasure";
import { FaPlus } from "react-icons/fa";

import classes from "./TractInfoDisplay.module.css";
import type { TractInfo } from "./useDragToResizeGrid";

const ALLOWED_UNITS: CSSUnits[] = ["fr", "px"];
export function TractInfoDisplay({
  dir,
  index,
  size,
  show,
  onChange,
}: TractInfo & { show: boolean; onChange: (size: CSSMeasure) => void }) {
  return (
    <div
      className={classes.tractInfoDisplay}
      data-drag-dir={dir}
      data-visible={show}
      style={
        {
          "--tract-index": index + 1,
        } as React.CSSProperties
      }
    >
      <AddTractButton
        placement="before"
        dir={dir}
        onClick={() => console.log("adding tract", dir)}
      />
      <div className={classes.hoverListener} />
      <div className={classes.sizeWidget}>
        <CSSUnitInputSimple
          value={size}
          units={ALLOWED_UNITS}
          onChange={onChange}
        />
      </div>
      <AddTractButton
        placement="after"
        dir={dir}
        onClick={() => console.log("adding tract", dir)}
      />
    </div>
  );
}

function AddTractButton({
  placement,
  dir,
  onClick,
}: {
  placement: "before" | "after";
  dir: TractInfo["dir"];
  onClick: () => void;
}) {
  const className =
    placement === "after"
      ? classes.tractAddAfterButton
      : classes.tractAddBeforeButton;

  const popoverPlacement = dir === "rows" ? "right" : "bottom";

  const label = dir === "rows" ? `Add row` : `Add column`;

  return (
    <PopoverButton
      className={className}
      placement={popoverPlacement}
      aria-label={label}
      popoverText={label}
      onClick={onClick}
    >
      <FaPlus />
    </PopoverButton>
  );
}
