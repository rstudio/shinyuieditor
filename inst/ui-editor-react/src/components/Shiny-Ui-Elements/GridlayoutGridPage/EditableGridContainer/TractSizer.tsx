import * as React from "react";

import type { TractDirection } from "..";

import classes from "./TractSizer.module.css";
import type { TractEventListners } from "./useDragToResizeGrid";

export function TractSizer({
  dir,
  index,
  event_listeners: { onTractHover, onTractMouseOut, startDrag },
}: {
  dir: TractDirection;
  index: number;
  event_listeners: TractEventListners;
}) {
  return (
    <div
      key={dir + index}
      className={dir === "rows" ? classes.rowSizer : classes.columnSizer}
      onMouseOver={(e) => onTractHover({ e, dir, index })}
      onMouseOut={onTractMouseOut}
      onMouseDown={(e) => startDrag({ e, dir, index })}
      style={{ [dir === "rows" ? "gridRow" : "gridColumn"]: index }}
    />
  );
}
