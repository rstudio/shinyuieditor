import { nodeInfoFactory } from "../nodeInfoFactory";
import type { MakeShinyUiNode } from "../uiNodeTypes";

type TabPanelSettings = {
  title: string;
};

export type TabPanelNode = MakeShinyUiNode<TabPanelSettings>;

export const tab_panel = nodeInfoFactory<TabPanelSettings>()({
  id: "tabPanel",
  r_info: {
    fn_name: "tabPanel",
    package: "shiny",
  },
  py_info: {
    fn_name: "ui.nav",
    package: "shiny",
  },

  title: "Tab Panel",
  takesChildren: true,
  settingsInfo: {
    title: {
      label: "Title of panel",
      inputType: "string",
      defaultValue: "My Shiny App",
      py_positional_index: 0,
    },
  },
  category: "Tabs",
  description:
    "Panel containing content for tab-based interfaces like navbar pages",
});
