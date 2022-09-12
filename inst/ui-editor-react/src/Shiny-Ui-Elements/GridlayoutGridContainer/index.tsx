import icon from "assets/icons/shinyGridContainer.png";
import {
  updateGridLayoutAreaOnItemAreaChange,
  removeDeletedGridAreaFromLayout,
} from "components/Grids/watchAndReactToGridAreaUpdatesupdate";
import type { TemplatedGridProps } from "Shiny-Ui-Elements/GridlayoutGridPage";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridContainer from "./GridlayoutGridContainer";
import { GridlayoutGridContainerSettings } from "./SettingsPanel";

export type GridContainerSettings = TemplatedGridProps;

export const gridlayoutGridContainerDefaultSettings: GridContainerSettings = {
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
    title: "Grid Container",
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
    description: `A general container for arranging items using \`gridlayout\``,
  };

export default gridlayoutGridContainerInfo;
