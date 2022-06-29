import textIcon from "assets/icons/shinyText.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridCardText from "./GridlayoutCardText";
import { GridlayoutGridCardTextSettings } from "./SettingsPanel";

export interface GridlayoutGridCardTextProps {
  content: string;
  h_align: "center" | "start" | "end";
  area: string;
  is_title?: boolean;
}

export const gridlayoutTextPanelInfo: UiComponentInfo<GridlayoutGridCardTextProps> =
  {
    title: "Text Panel",
    UiComponent: GridlayoutGridCardText,
    SettingsComponent: GridlayoutGridCardTextSettings,
    acceptsChildren: false,
    defaultSettings: {
      area: "text_panel",
      content: "Text from Chooser",
      h_align: "start",
    },
    iconSrc: textIcon,
    category: "gridlayout",
  };

export default GridlayoutGridCardText;
