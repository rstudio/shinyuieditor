import plotIcon from "assets/icons/shinyPlot.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyPlotOutputSettings } from "./SettingsPanel";
import ShinyPlotOutput from "./ShinyPlotOutput";

export type ShinyPlotOutputProps = {
  outputId: string;
  width?: string;
  height?: string;
};

export const shinyPlotOutputInfo: UiComponentInfo<ShinyPlotOutputProps> = {
  title: "Plot Output",
  UiComponent: ShinyPlotOutput,
  SettingsComponent: ShinyPlotOutputSettings,
  acceptsChildren: false,
  defaultSettings: { outputId: "plot", width: "100%", height: "400px" },
  iconSrc: plotIcon,
};

export default ShinyPlotOutput;
