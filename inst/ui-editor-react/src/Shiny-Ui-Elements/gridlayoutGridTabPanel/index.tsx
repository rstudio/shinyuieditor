import icon from "assets/icons/tabPanel.png";
import type { TemplatedGridProps } from "Shiny-Ui-Elements/GridlayoutGridPage";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridTabPanel from "./GridlayoutGridTabPanel";
import { GridlayoutGridTabPanelSettings } from "./SettingsPanel";

export type GridTabPanelSettings = {
  title: string;
} & TemplatedGridProps;

export const gridlayoutGridTabPanelDefaultSettings: GridTabPanelSettings = {
  title: "Grid Panel",
  areas: [
    [".", "."],
    [".", "."],
  ],
  row_sizes: ["1fr", "1fr"],
  col_sizes: ["1fr", "1fr"],
  gap_size: "1rem",
};

export const gridlayoutGridTabPanelInfo: UiComponentInfo<GridTabPanelSettings> =
  {
    title: "Gridlayout Tab Panel",
    UiComponent: GridlayoutGridTabPanel,
    SettingsComponent: GridlayoutGridTabPanelSettings,
    acceptsChildren: true,
    defaultSettings: gridlayoutGridTabPanelDefaultSettings,
    iconSrc: icon,
    category: "Tabs",
    description: "A tab panel with a grid layout",
  };

export default gridlayoutGridTabPanelInfo;
