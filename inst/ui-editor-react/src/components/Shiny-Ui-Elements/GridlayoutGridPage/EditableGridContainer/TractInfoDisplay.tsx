import * as React from "react";

import { CSSUnitInput } from "components/Inputs/CSSUnitInput";
import type { CSSMeasure } from "CSSMeasure";

import classes from "./TractInfoDisplay.module.css";
import type { TractInfo } from "./useDragToResizeGrid";

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
      <div className={classes.sizeWidget}>
        {/* {size} */}
        <CSSUnitInput value={size} onChange={onChange} />
      </div>
    </div>
  );
}
