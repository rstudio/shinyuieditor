import plotIcon from "assets/icons/shinyPlot.png";
import type { UiNodeSettingsInfo } from "components/Inputs/SettingsFormBuilder/inputFieldTypes";

import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyPlotOutput from "./ShinyPlotOutput";

export const ShinyPlotOutputSettingsInfo: UiNodeSettingsInfo = {
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
};

export type ShinyPlotOutputProps = {
  outputId: string;
  width?: string;
  height?: string;
};

export const shinyPlotOutputInfo: UiComponentInfo<ShinyPlotOutputProps> = {
  title: "Plot Output",
  UiComponent: ShinyPlotOutput,
  settingsInfo: ShinyPlotOutputSettingsInfo,
  acceptsChildren: false,
  defaultSettings: { outputId: "plot", width: "100%", height: "400px" },
  iconSrc: plotIcon,
  category: "Outputs",
  description: "Render a `renderPlot()` within an application page.",
};

export default ShinyPlotOutput;
