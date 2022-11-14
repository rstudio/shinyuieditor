import icon from "assets/icons/shinyPlot.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import PlotlyPlotlyOutput from "./PlotlyPlotlyOutput";

export type PlotlyOutputSettings = {
  outputId: string;
  width?: string;
  height?: string;
};

export const plotlyPlotlyOutputInfo: UiComponentInfo<PlotlyOutputSettings> = {
  title: "Plotly Plot",
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
    },
    height: {
      label: "Height",
      inputType: "cssMeasure",
      defaultValue: "400px",
    },
  },
  acceptsChildren: false,
  iconSrc: icon,
  category: "Plotting",
  description: "Output for interactive `plotly` plots.",
};
