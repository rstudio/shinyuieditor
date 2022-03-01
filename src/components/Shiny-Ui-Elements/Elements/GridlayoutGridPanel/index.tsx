import containerIcon from "assets/icons/shinyContainer.png";

import { UiComponentInfo } from "../uiNodeTypes";
import GridlayoutGridPanel from "./GridlayoutGridPanel";
import { GridlayoutGridPanelSettings } from "./SettingsPanel";

export type HorizontalAlignments = "left" | "center" | "right" | "spread";
export type VerticalAlignments = "top" | "center" | "bottom" | "spread";
export type GridPanelSettings = {
  area?: string;
  horizontalAlign?: HorizontalAlignments;
  verticalAlign?: VerticalAlignments;
};

export const gridLayoutGridPanelInfo: UiComponentInfo<GridPanelSettings> = {
  title: "Grid Panel",
  UiComponent: GridlayoutGridPanel,
  SettingsComponent: GridlayoutGridPanelSettings,
  acceptsChildren: true,
  defaultSettings: {
    area: "default-grid-panel-area",
    verticalAlign: "center",
    horizontalAlign: "center",
  },
  iconSrc: containerIcon,
};

export default GridlayoutGridPanel;
