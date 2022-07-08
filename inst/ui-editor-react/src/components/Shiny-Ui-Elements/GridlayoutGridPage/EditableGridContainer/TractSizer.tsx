import type { TractDirection } from "..";

import classes from "./TractSizer.module.css";
import type { TractEventListener } from "./useDragToResizeGrid";

export function TractSizer({
  dir,
  index,
  onStartDrag,
}: {
  dir: TractDirection;
  index: number;
  onStartDrag: TractEventListener;
}) {
  return (
    <div
      className={dir === "rows" ? classes.rowSizer : classes.columnSizer}
      onMouseDown={(e) => onStartDrag({ e, dir, index })}
      style={{ [dir === "rows" ? "gridRow" : "gridColumn"]: index }}
    />
  );
}
