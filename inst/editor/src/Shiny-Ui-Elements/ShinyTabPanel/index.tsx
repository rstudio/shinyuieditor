import icon from "../../assets/icons/tabPanel.png";
import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyTabPanel from "./ShinyTabPanel";

export type TabPanelSettings = {
  title: string;
};

export const shinyTabPanelInfo: UiComponentInfo<TabPanelSettings> = {
  title: "Tab Panel",
  UiComponent: ShinyTabPanel,
  settingsInfo: {
    title: {
      label: "Title of panel",
      inputType: "string",
      defaultValue: "My Shiny App",
    },
  },
  acceptsChildren: true,
  iconSrc: icon,
  category: "Tabs",
  description:
    "Panel containing content for tab-based interfaces like navbar pages",
};
