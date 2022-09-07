import icon from "assets/icons/tabPanel.png";
import {
  updateGridLayoutAreaOnItemAreaChange,
  removeDeletedGridAreaFromLayout,
} from "components/Grids/watchAndReactToGridAreaUpdatesupdate";
import type { TemplatedGridProps } from "Shiny-Ui-Elements/GridlayoutGridPage";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridContainer from "./GridlayoutGridContainer";
import { GridlayoutGridContainerSettings } from "./SettingsPanel";

export type GridContainerSettings = {
  title: string;
} & TemplatedGridProps;

export const gridlayoutGridContainerDefaultSettings: GridContainerSettings = {
  title: "Grid Panel",
  areas: [
    [".", "."],
    [".", "."],
  ],
  row_sizes: ["1fr", "1fr"],
  col_sizes: ["1fr", "1fr"],
  gap_size: "1rem",
};

export const gridlayoutGridContainerInfo: UiComponentInfo<GridContainerSettings> =
  {
    title: "Gridlayout Tab Panel",
    UiComponent: GridlayoutGridContainer,
    SettingsComponent: GridlayoutGridContainerSettings,
    acceptsChildren: true,
    defaultSettings: gridlayoutGridContainerDefaultSettings,
    iconSrc: icon,
    category: "Tabs",
    stateUpdateSubscribers: {
      UPDATE_NODE: updateGridLayoutAreaOnItemAreaChange,
      DELETE_NODE: removeDeletedGridAreaFromLayout,
    },
    description: "A tab panel with a grid layout",
  };

export default gridlayoutGridContainerInfo;
