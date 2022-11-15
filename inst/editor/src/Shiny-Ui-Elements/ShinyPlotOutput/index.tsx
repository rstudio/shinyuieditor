import plotIcon from "../../assets/icons/shinyPlot.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyPlotOutput from "./ShinyPlotOutput";

export type ShinyPlotOutputProps = {
  outputId: string;
  width?: string;
  height?: string;
};

export const shinyPlotOutputInfo: UiComponentInfo<ShinyPlotOutputProps> = {
  title: "Plot Output",
  UiComponent: ShinyPlotOutput,
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
  iconSrc: plotIcon,
  category: "Outputs",
  description: "Render a `renderPlot()` within an application page.",
};

export default ShinyPlotOutput;
