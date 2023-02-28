import containerIcon from "../../assets/icons/shinyContainer.png";
import type { CardSettings } from "../BslibCards/BslibCard";
import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridCard from "./GridlayoutCard";

export type GridContainerSettings = {
  area: string;
};
export type GridBslibCardCardSettings = CardSettings & GridContainerSettings;

export const gridlayoutCardInfo: UiComponentInfo<GridBslibCardCardSettings> = {
  title: "Grid Card",
  UiComponent: GridlayoutGridCard,
  settingsInfo: {
    area: {
      label: "Name of grid area",
      inputType: "string",
      defaultValue: "default-area",
    },
  },
  acceptsChildren: true,
  iconSrc: containerIcon,
  category: "gridlayout",
  description: "bslib styled card for grid layouts",
};
