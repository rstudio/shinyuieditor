import gridIcon from "assets/icons/shinyDatatable.png";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { UiComponentInfo } from "../UiComponentInfo";
import { GridlayoutGridPage } from "./GridlayoutGridPage";
import { GridlayoutGridPageSettings } from "./SettingsPanel";

export const gridlayoutGridPageInfo: UiComponentInfo<TemplatedGridProps> = {
  title: "Slider Input",
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
  iconSrc: gridIcon,
};

export default GridlayoutGridPage;
