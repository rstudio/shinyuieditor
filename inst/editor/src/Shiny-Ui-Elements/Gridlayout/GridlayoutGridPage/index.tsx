import { nodeInfoFactory } from "../../nodeInfoFactory";
import type { GridLayoutArgs } from "../Utils/GridContainerElement/GridLayoutArgs";
import {
  removeDeletedGridAreaFromLayout,
  updateGridLayoutAreaOnItemAreaChange,
} from "../Utils/watchAndReactToGridAreaUpdatesupdate";

import { GridlayoutGridPage } from "./GridlayoutGridPage";

export type TractDirection = "rows" | "cols";

export const gridlayoutGridPageInfo = nodeInfoFactory<
  GridLayoutArgs & { theme?: unknown }
>()({
  r_package: "gridlayout",
  name: "grid_page",
  title: "Grid Page",
  takesChildren: true,
  UiComponent: GridlayoutGridPage,
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
    row_sizes: {
      inputType: "omitted",
      defaultValue: ["1fr", "1fr"],
    },
    col_sizes: {
      inputType: "omitted",
      defaultValue: ["1fr", "1fr"],
    },
    theme: { inputType: "omitted", optional: true },
  },
  stateUpdateSubscribers: {
    UPDATE_NODE: updateGridLayoutAreaOnItemAreaChange,
    DELETE_NODE: removeDeletedGridAreaFromLayout,
  },
  category: "gridlayout",
});

export default GridlayoutGridPage;
