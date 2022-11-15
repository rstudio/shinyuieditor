import icon from "../../assets/icons/shinyGridContainer.png";
import {
  updateGridLayoutAreaOnItemAreaChange,
  removeDeletedGridAreaFromLayout,
} from "../../components/Grids/watchAndReactToGridAreaUpdatesupdate";
import type { TemplatedGridProps } from "../GridlayoutGridPage";
import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridContainer from "./GridlayoutGridContainer";

export type GridContainerSettings = TemplatedGridProps;

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
      areas: {
        inputType: "omitted",
        defaultValue: [
          [".", "."],
          [".", "."],
        ],
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
