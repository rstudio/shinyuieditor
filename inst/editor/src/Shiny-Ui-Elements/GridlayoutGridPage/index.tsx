import type { GridLayoutArgs } from "../../components/GridlayoutElement/GridLayoutArgs";
import {
  updateGridLayoutAreaOnItemAreaChange,
  removeDeletedGridAreaFromLayout,
} from "../../components/Grids/watchAndReactToGridAreaUpdatesupdate";
import type { UiComponentInfo } from "../uiNodeTypes";

import { GridlayoutGridPage } from "./GridlayoutGridPage";

export type TractDirection = "rows" | "cols";

export const gridlayoutGridPageInfo: UiComponentInfo<GridLayoutArgs> = {
  title: "Grid Page",
  UiComponent: GridlayoutGridPage,
  acceptsChildren: true,
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
  stateUpdateSubscribers: {
    UPDATE_NODE: updateGridLayoutAreaOnItemAreaChange,
    DELETE_NODE: removeDeletedGridAreaFromLayout,
  },
  category: "gridlayout",
};

export default GridlayoutGridPage;
