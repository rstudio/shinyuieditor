import type { CSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";
import type { UiNodeSettingsInfo } from "components/Inputs/SettingsFormBuilder/inputFieldTypes";

import {
  removeDeletedGridAreaFromLayout,
  updateGridLayoutAreaOnItemAreaChange,
} from "../../components/Grids/watchAndReactToGridAreaUpdatesupdate";
import type { UiComponentInfo } from "../uiNodeTypes";

import { GridlayoutGridPage } from "./GridlayoutGridPage";
import { GridlayoutGridPageSettings } from "./SettingsPanel";

export type TemplatedGridProps = {
  areas: string[][];
  row_sizes: CSSMeasure[];
  col_sizes: CSSMeasure[];
  gap_size: CSSMeasure;
};

export const GridPageSettingsInfo: UiNodeSettingsInfo = {
  gap_size: {
    label: "Width",
    inputType: "cssMeasure",
    defaultValue: "10px",
    units: ["px", "rem"],
  },
  areas: { inputType: "omitted" },
  row_sizes: { inputType: "omitted" },
  col_sizes: { inputType: "omitted" },
};

export type TractDirection = "rows" | "cols";

export const gridlayoutGridPageInfo: UiComponentInfo<TemplatedGridProps> = {
  title: "Grid Page",
  UiComponent: GridlayoutGridPage,
  SettingsComponent: GridlayoutGridPageSettings,
  acceptsChildren: true,
  settingsInfo: GridPageSettingsInfo,
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
