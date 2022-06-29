import textIcon from "assets/icons/shinyText.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridCardText from "./GridlayoutCardText";
import { GridlayoutGridCardTextSettings } from "./SettingsPanel";

export interface GridlayoutGridCardTextProps {
  content: string;
  alignment: "center" | "start" | "end";
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
      alignment: "start",
    },
    iconSrc: textIcon,
    category: "gridlayout",
  };

export default GridlayoutGridCardText;
