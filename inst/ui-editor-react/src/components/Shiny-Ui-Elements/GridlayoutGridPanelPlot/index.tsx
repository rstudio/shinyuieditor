import icon from "assets/icons/shinyPlot.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridPanelPlot from "./GridlayoutGridPanelPlot";
import { GridlayoutGridPanelPlotSettings } from "./SettingsPanel";

export interface GridlayoutGridPanelPlotProps {
  area: string;
  outputId?: string;
}

export const GridlayoutGridPanelPlotInfo: UiComponentInfo<GridlayoutGridPanelPlotProps> =
  {
    title: "Plot Panel",
    UiComponent: GridlayoutGridPanelPlot,
    SettingsComponent: GridlayoutGridPanelPlotSettings,
    acceptsChildren: false,
    defaultSettings: { area: "plot" },
    iconSrc: icon,
    category: "gridlayout",
  };

export default GridlayoutGridPanelPlot;
