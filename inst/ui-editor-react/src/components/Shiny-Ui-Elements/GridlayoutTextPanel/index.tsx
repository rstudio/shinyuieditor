import textIcon from "assets/icons/shinyText.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutTextPanel from "./GridlayoutTextPanel";
import { GridlayoutTextPanelSettings } from "./SettingsPanel";

export interface GridlayoutTextPanelProps {
  content: string;
  h_align: "center" | "start" | "end";
  area: string;
  is_title?: boolean;
}

export const gridlayoutTextPanelInfo: UiComponentInfo<GridlayoutTextPanelProps> =
  {
    title: "Text Panel",
    UiComponent: GridlayoutTextPanel,
    SettingsComponent: GridlayoutTextPanelSettings,
    acceptsChildren: false,
    defaultSettings: {
      area: "text_panel",
      content: "Text from Chooser",
      h_align: "start",
    },
    iconSrc: textIcon,
    category: "gridlayout",
  };

export default GridlayoutTextPanel;
