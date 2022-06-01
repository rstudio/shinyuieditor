import * as React from "react";

import { CSSUnitInputSimple } from "components/Inputs/CSSUnitInput/CSSUnitInputSimple";
import type { CSSMeasure, CSSUnits } from "CSSMeasure";

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
      <div className={classes.hoverListener} />
      <div className={classes.sizeWidget}>
        <CSSUnitInputSimple
          value={size}
          units={ALLOWED_UNITS}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
