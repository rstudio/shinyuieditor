import {
  removeDeletedGridAreaFromLayout,
  updateGridLayoutAreaOnItemAreaChange,
} from "components/Grids/watchAndReactToGridAreaUpdatesupdate";
import type { CSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";

import type { UiComponentInfo } from "../uiNodeTypes";

import { GridlayoutGridPage } from "./GridlayoutGridPage";

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
  acceptsChildren: true,
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
  stateUpdateSubscribers: {
    UPDATE_NODE: updateGridLayoutAreaOnItemAreaChange,
    DELETE_NODE: removeDeletedGridAreaFromLayout,
  },
  category: "gridlayout",
};

export default GridlayoutGridPage;
