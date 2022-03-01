import plotIcon from "assets/icons/shinyPlot.png";
import { UiComponentInfo } from "../uiNodeTypes";
import { ShinyPlotOutputSettings } from "./SettingsPanel";
import ShinyPlotOutput from "./ShinyPlotOutput";

export type ShinyPlotOutputProps = Partial<{
  outputId: string;
  width: string;
  height: string;
}>;

export const shinyPlotOutputInfo: UiComponentInfo<ShinyPlotOutputProps> = {
  title: "Plot Output",
  UiComponent: ShinyPlotOutput,
  SettingsComponent: ShinyPlotOutputSettings,
  acceptsChildren: true,
  defaultSettings: { outputId: "plot" },
  iconSrc: plotIcon,
};

export default ShinyPlotOutput;
