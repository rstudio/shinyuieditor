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
  rowSizes: CSSMeasure[];
  colSizes: CSSMeasure[];
  gapSize: CSSMeasure;
};

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
    rowSizes: ["100px", "1fr"],
    colSizes: ["250px", "1fr"],
    gapSize: "1rem",
  },
  stateUpdateSubscribers: {
    UPDATE_NODE: updateGridLayoutAreaOnItemAreaChange,
    DELETE_NODE: removeDeletedGridAreaFromLayout,
  },
  category: "gridlayout",
};

export default GridlayoutGridPage;
