import plotIcon from "assets/icons/shinyPlot.png";
import type { DynamicFormInfo } from "components/Inputs/SettingsFormBuilder/inputFieldTypes";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyPlotOutputSettings } from "./SettingsPanel";
import ShinyPlotOutput from "./ShinyPlotOutput";

export const ShinyPlotOutputSettingsInfo: DynamicFormInfo = {
  outputId: {
    inputType: "string",
    label: "output id for plot",
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
  SettingsComponent: ShinyPlotOutputSettings,
  acceptsChildren: false,
  defaultSettings: { outputId: "plot", width: "100%", height: "400px" },
  iconSrc: plotIcon,
  category: "Outputs",
  description: "Render a `renderPlot()` within an application page.",
};

export default ShinyPlotOutput;
