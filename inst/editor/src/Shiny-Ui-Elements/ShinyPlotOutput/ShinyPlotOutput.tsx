import type { UiLeafNodeComponent } from "../uiNodeTypes";

import type { ShinyPlotOutputProps } from "./index";

import { PlotPlaceholder } from "./PlotPlaceholder";
import classes from "./styles.module.css";

const ShinyPlotOutput: UiLeafNodeComponent<ShinyPlotOutputProps> = ({
  uiArguments: { outputId, width = "300px", height = "200px" },
  wrapperProps,
}) => {
  return (
    <div
      className={classes.container}
      style={{ height, width }}
      {...wrapperProps}
    >
      <PlotPlaceholder outputId={outputId} />
    </div>
  );
};

export default ShinyPlotOutput;
