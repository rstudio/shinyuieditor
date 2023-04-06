import icon from "../../assets/icons/shinyPlot.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import { nodeInfoFactory } from "../nodeInfoFactory";

import PlotlyPlotlyOutput from "./PlotlyPlotlyOutput";

export type PlotlyOutputSettings = {
  outputId: string;
  width?: CSSMeasure;
  height?: CSSMeasure;
};

export const plotlyPlotlyOutputInfo = nodeInfoFactory<PlotlyOutputSettings>()({
  r_package: "plotly",
  name: "plotlyOutput",
  title: "Plotly Plot",
  takesChildren: false,
  UiComponent: PlotlyPlotlyOutput,
  settingsInfo: {
    outputId: {
      inputType: "string",
      label: "Output ID for plot",
      defaultValue: "plot",
    },
    width: {
      label: "Width",
      inputType: "cssMeasure",
      defaultValue: "100%",
      optional: true,
    },
    height: {
      label: "Height",
      inputType: "cssMeasure",
      defaultValue: "400px",
      optional: true,
    },
  },
  serverBindings: {
    outputs: {
      outputIdKey: "outputId",
      renderScaffold: `renderPlotly({\n  plot_ly(z = ~volcano, type = "surface")\n})`,
    },
  },
  iconSrc: icon,
  category: "Plotting",
  description: "Output for interactive `plotly` plots.",
});
