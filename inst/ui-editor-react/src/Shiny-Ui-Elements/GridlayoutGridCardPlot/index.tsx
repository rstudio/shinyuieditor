import icon from "assets/icons/shinyPlot.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridCardPlot from "./GridlayoutGridCardPlot";
import { GridlayoutGridCardPlotSettings } from "./SettingsPanel";

export interface GridlayoutGridCardPlotProps {
  area: string;
  outputId?: string;
}

export const GridlayoutGridCardPlotInfo: UiComponentInfo<GridlayoutGridCardPlotProps> =
  {
    title: "Grid Plot Card",
    UiComponent: GridlayoutGridCardPlot,
    SettingsComponent: GridlayoutGridCardPlotSettings,
    acceptsChildren: false,
    defaultSettings: { area: "plot" },
    iconSrc: icon,
    category: "gridlayout",
    description: `A wrapper for \`shiny::plotOutput()\` that uses \`gridlayout\`-friendly sizing defaults. 
    For when you want to have a grid area filled entirely with a single plot.`,
  };

export default GridlayoutGridCardPlot;
