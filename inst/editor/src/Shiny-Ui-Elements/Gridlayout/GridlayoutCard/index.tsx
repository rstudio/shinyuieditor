import containerIcon from "../../../assets/icons/shinyContainer.png";
import type { CardSettings } from "../../Bslib/BslibCard";
import { bslib_card_settings_info } from "../../Bslib/BslibCard";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import { grid_container_nodes } from "../grid_container_nodes";

import GridlayoutGridCard from "./GridlayoutCard";

export type GridItemSettings = {
  area: string;
};
export type GridBslibCardCardSettings = CardSettings & GridItemSettings;

export const gridlayoutCardInfo = nodeInfoFactory<GridBslibCardCardSettings>()({
  library: "gridlayout",
  name: "grid_card",
  title: "Grid Card",
  UiComponent: GridlayoutGridCard,
  settingsInfo: {
    area: {
      label: "Name of grid area",
      inputType: "string",
      defaultValue: "default-area",
    },
    ...bslib_card_settings_info,
  },
  allowedParents: grid_container_nodes,
  iconSrc: containerIcon,
  category: "gridlayout",
  description: "bslib styled card for grid layouts",
});
