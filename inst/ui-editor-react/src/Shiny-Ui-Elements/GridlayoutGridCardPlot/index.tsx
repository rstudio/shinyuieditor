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
  };

export default GridlayoutGridCardPlot;
