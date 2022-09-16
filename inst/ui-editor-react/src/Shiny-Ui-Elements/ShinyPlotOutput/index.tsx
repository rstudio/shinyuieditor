import plotIcon from "assets/icons/shinyPlot.png";
import type { SettingsInfo } from "components/Inputs/SettingsFormBuilder/ArgumentInfo";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyPlotOutputSettings } from "./SettingsPanel";
import ShinyPlotOutput from "./ShinyPlotOutput";

export const ShinyPlotOutputSettingsInfo: SettingsInfo = {
  outputId: {
    inputType: "string",
    defaultValue: "plot",
  },
  width: {
    inputType: "cssMeasure",
    defaultValue: "100%",
  },
  height: {
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
  // settingsInfo: ShinyPlotOutputSettingsInfo,
  SettingsComponent: ShinyPlotOutputSettings,
  acceptsChildren: false,
  defaultSettings: { outputId: "plot", width: "100%", height: "400px" },
  iconSrc: plotIcon,
  category: "Outputs",
  description: "Render a `renderPlot()` within an application page.",
};

export default ShinyPlotOutput;
