import icon from "../../../assets/icons/shinyGridContainer.png";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import type { GridLayoutArgs } from "../Utils/GridContainerElement/GridLayoutArgs";
import {
  removeDeletedGridAreaFromLayout,
  updateGridLayoutAreaOnItemAreaChange,
} from "../Utils/watchAndReactToGridAreaUpdatesupdate";

import GridlayoutGridContainer from "./GridlayoutGridContainer";

export type GridContainerSettings = GridLayoutArgs;

export const gridlayoutGridContainerInfo =
  nodeInfoFactory<GridContainerSettings>()({
    r_package: "gridlayout",
    r_fn_name: "grid_container",
    title: "Grid Container",
    takesChildren: true,
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
    iconSrc: icon,
    category: "Tabs",
    stateUpdateSubscribers: {
      UPDATE_NODE: updateGridLayoutAreaOnItemAreaChange,
      DELETE_NODE: removeDeletedGridAreaFromLayout,
    },
    description: `A general container for arranging items using \`gridlayout\``,
  });
