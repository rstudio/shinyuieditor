import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridPanel from "./GridlayoutGridPanel";
import { GridlayoutGridPanelSettings } from "./SettingsPanel";

// export type HorizontalAlignments = "left" | "center" | "right" | "spread";
// export type VerticalAlignments = "top" | "center" | "bottom" | "spread";
export type Alignments = "start" | "center" | "end" | "spread";
export type GridPanelSettings = {
  area: string;
  h_align?: Alignments;
  v_align?: Alignments;
  title?: string;
};

export const gridLayoutGridPanelInfo: UiComponentInfo<GridPanelSettings> = {
  title: "Grid Panel",
  UiComponent: GridlayoutGridPanel,
  SettingsComponent: GridlayoutGridPanelSettings,
  acceptsChildren: true,
  defaultSettings: {
    area: "default-grid-panel-area",
  },
  // iconSrc: containerIcon,
};

export default GridlayoutGridPanel;
