import icon from "../../../assets/icons/shinyGridContainer.png";
import type { UiComponentInfo } from "../../uiNodeTypes";
import type { GridLayoutArgs } from "../Utils/GridContainerElement/GridLayoutArgs";
import {
  removeDeletedGridAreaFromLayout,
  updateGridLayoutAreaOnItemAreaChange,
} from "../Utils/watchAndReactToGridAreaUpdatesupdate";

import GridlayoutGridContainer from "./GridlayoutGridContainer";

export type GridContainerSettings = GridLayoutArgs;

export const gridlayoutGridContainerInfo: UiComponentInfo<GridContainerSettings> =
  {
    title: "Grid Container",
    UiComponent: GridlayoutGridContainer,
    settingsInfo: {
      gap_size: {
        label: "Width",
        inputType: "cssMeasure",
        defaultValue: "10px",
        units: ["px", "rem"],
      },
      layout: {
        inputType: "omitted",
        defaultValue: [". .", ". ."],
      },
      row_sizes: { inputType: "omitted", defaultValue: ["1fr", "1fr"] },
      col_sizes: { inputType: "omitted", defaultValue: ["1fr", "1fr"] },
    },
    acceptsChildren: true,
    iconSrc: icon,
    category: "Tabs",
    stateUpdateSubscribers: {
      UPDATE_NODE: updateGridLayoutAreaOnItemAreaChange,
      DELETE_NODE: removeDeletedGridAreaFromLayout,
    },
    description: `A general container for arranging items using \`gridlayout\``,
  };