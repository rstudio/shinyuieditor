import * as React from "react";

import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { ShinyPlotOutputProps } from "./index";

import { PlotPlaceholder } from "./PlotPlaceholder";
import classes from "./styles.module.css";

const ShinyPlotOutput: UiNodeComponent<ShinyPlotOutputProps> = ({
  uiArguments: { outputId, width = "300px", height = "200px" },
  compRef,
  wrapperProps,
}) => {
  return (
    <div
      className={classes.container}
      ref={compRef}
      style={{ height, width }}
      aria-label="shiny::plotOutput element"
      {...wrapperProps}
    >
      <PlotPlaceholder outputId={outputId} />
    </div>
  );
};

export default ShinyPlotOutput;
