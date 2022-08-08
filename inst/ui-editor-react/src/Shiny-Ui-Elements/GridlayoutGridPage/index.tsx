import type { CSSMeasure } from "CSSMeasure";

import type { UiComponentInfo } from "../uiNodeTypes";

import { GridlayoutGridPage } from "./GridlayoutGridPage";
import { GridlayoutGridPageSettings } from "./SettingsPanel";
import {
  removeDeletedGridAreaFromLayout,
  updateGridLayoutAreaOnItemAreaChange,
} from "./watchAndReactToGridAreaUpdatesupdate";

export type TemplatedGridProps = {
  areas: string[][];
  row_sizes: CSSMeasure[];
  col_sizes: CSSMeasure[];
  gap_size: CSSMeasure;
};

export type TractDirection = "rows" | "cols";

export const gridlayoutGridPageInfo: UiComponentInfo<TemplatedGridProps> = {
  title: "Grid Page",
  UiComponent: GridlayoutGridPage,
  SettingsComponent: GridlayoutGridPageSettings,
  acceptsChildren: true,
  defaultSettings: {
    areas: [
      ["header", "header"],
      ["sidebar", "main"],
    ],
    row_sizes: ["100px", "1fr"],
    col_sizes: ["250px", "1fr"],
    gap_size: "1rem",
  },
  stateUpdateSubscribers: {
    UPDATE_NODE: updateGridLayoutAreaOnItemAreaChange,
    DELETE_NODE: removeDeletedGridAreaFromLayout,
  },
  category: "gridlayout",
};

export default GridlayoutGridPage;
