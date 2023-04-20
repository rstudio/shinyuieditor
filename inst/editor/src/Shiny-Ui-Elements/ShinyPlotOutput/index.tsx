import { output_plot } from "ui-node-definitions/src/Shiny/output_plot";

import plotIcon from "../../assets/icons/shinyPlot.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";

import { PlotPlaceholder } from "./PlotPlaceholder";
import classes from "./styles.module.css";

export type ShinyPlotOutputProps = {
  outputId: string;
  width?: CSSMeasure;
  height?: CSSMeasure;
};

export const shinyPlotOutputInfo = add_editor_info_to_ui_node(output_plot, {
  iconSrc: plotIcon,
  UiComponent: ({
    namedArgs: { outputId, width, height = "400px" },
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
  },
});
