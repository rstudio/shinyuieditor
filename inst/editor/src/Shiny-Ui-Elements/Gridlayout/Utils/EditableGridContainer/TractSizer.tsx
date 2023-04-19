import type { TractDirection } from "../../GridlayoutGridPage/TractDirection";

import classes from "./TractSizer.module.css";
import type { TractEventListener } from "./useDragToResizeGrid";

export function TractSizerHandle({
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
      title={`resize ${dir === "rows" ? "rows" : "columns"} ${
        index - 1
      } and ${index}`}
      onMouseDown={(e) => onStartDrag({ e, dir, index })}
      style={{ [dir === "rows" ? "gridRow" : "gridColumn"]: index }}
    />
  );
}
