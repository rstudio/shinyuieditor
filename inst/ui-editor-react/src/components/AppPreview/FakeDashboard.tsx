import React from "react";

import previewClasses from "./AppPreview.module.css";
import classes from "./FakeDashboard.module.css";

const FakeDashboard = () => {
  return (
    <div className={previewClasses.appContainer}>
      <div
        className={classes.fakeDashboard + " " + previewClasses.previewFrame}
      >
        <div className={classes.header}>
          <h1>App preview not available</h1>
        </div>
        <div className={classes.sidebar}></div>
        <div className={classes.top}></div>
        <div className={classes.bottom}></div>
      </div>
    </div>
  );
};

export default FakeDashboard;
