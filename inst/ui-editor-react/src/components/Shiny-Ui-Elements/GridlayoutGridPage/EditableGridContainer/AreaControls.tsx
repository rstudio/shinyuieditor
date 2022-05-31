import * as React from "react";

import classes from "./resizableGrid.module.css";

export function AreaControls({ area }: { area: string }) {
  return (
    <div className={classes.areaControls} style={{ gridArea: area }}>
      <div className={classes.upperLeftSizer}></div>
      <div className={classes.lowerRightSizer}></div>
    </div>
  );
}
