import containerIcon from "../../../assets/icons/shinyContainer.png";
import type { CardSettings } from "../../Bslib/BslibCard";
import type { UiComponentInfo } from "../../uiNodeTypes";
import { grid_container_nodes } from "../grid_container_nodes";

import GridlayoutGridCard from "./GridlayoutCard";

export type GridItemSettings = {
  area: string;
};
export type GridBslibCardCardSettings = CardSettings & GridItemSettings;

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
  allowedParents: grid_container_nodes,
  acceptsChildren: true,
  iconSrc: containerIcon,
  category: "gridlayout",
  description: "bslib styled card for grid layouts",
};
