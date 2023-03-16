import icon from "../../assets/icons/tabPanel.png";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { MakeShinyUiNode } from "../uiNodeTypes";

import ShinyTabPanel from "./ShinyTabPanel";

export type TabPanelSettings = {
  title: string;
};

export type TabPanelNode = MakeShinyUiNode<TabPanelSettings>;

export const shinyTabPanelInfo = nodeInfoFactory<TabPanelSettings>()({
  library: "shiny",
  name: "tabPanel",
  title: "Tab Panel",
  takesChildren: true,
  UiComponent: ShinyTabPanel,
  settingsInfo: {
    title: {
      label: "Title of panel",
      inputType: "string",
      defaultValue: "My Shiny App",
    },
  },
  iconSrc: icon,
  category: "Tabs",
  description:
    "Panel containing content for tab-based interfaces like navbar pages",
});
