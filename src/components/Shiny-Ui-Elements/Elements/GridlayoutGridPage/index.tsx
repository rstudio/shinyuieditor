import { TemplatedGridProps } from "utils/gridTemplates/types";

import { UiComponentInfo } from "../uiNodeTypes";

import { GridlayoutGridPage } from "./GridlayoutGridPage";
import { GridlayoutGridPageSettings } from "./SettingsPanel";

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
};

export default GridlayoutGridPage;
