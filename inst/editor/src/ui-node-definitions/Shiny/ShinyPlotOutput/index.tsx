import type { CSSMeasure } from "../../../components/Inputs/CSSUnitInput/CSSMeasure";
import plotIcon from "../../assets/icons/shinyPlot.png";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";
import { output_plot } from "../output_plot";

import { StaticPlotPlaceholder } from "./StaticPlotPlaceholder";
import classes from "./styles.module.css";

export type ShinyPlotOutputProps = {
  outputId: string;
  width?: CSSMeasure;
  height?: CSSMeasure;
};

export const shinyPlotOutputInfo = addEditorInfoToUiNode(output_plot, {
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
        <StaticPlotPlaceholder outputId={outputId} />
      </div>
    );
  },
});
