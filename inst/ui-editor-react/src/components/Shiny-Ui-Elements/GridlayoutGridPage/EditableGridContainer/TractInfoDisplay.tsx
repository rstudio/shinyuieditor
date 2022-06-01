import * as React from "react";

import { CSSUnitInput } from "components/Inputs/CSSUnitInput";
import type { CSSMeasure } from "CSSMeasure";

import classes from "./TractInfoDisplay.module.css";
import type { TractInfo } from "./useDragToResizeGrid";

export function TractInfoDisplay({
  dir,
  index,
  size,
  onChange,
}: TractInfo & { onChange: (size: CSSMeasure) => void }) {
  return (
    <div
      className={classes.tractInfoDisplay}
      data-drag-dir={dir}
      style={
        {
          "--tract-index": index + 1,
        } as React.CSSProperties
      }
    >
      <div className={classes.sizeWidget}>
        <CSSUnitInput value={size} onChange={onChange} />
      </div>
    </div>
  );
}
