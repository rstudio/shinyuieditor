import { nodeInfoFactory } from "../nodeInfoFactory";
import type { MakeShinyUiNode } from "../ShinyUiNode";

type NavPanelSettings = {
  title: string;
};

export type NavPanelNode = MakeShinyUiNode<NavPanelSettings>;

export const nav_panel = nodeInfoFactory<NavPanelSettings>()({
  id: "nav_panel",
  r_info: {
    fn_name: "nav_panel",
    package: "bslib",
    fn_aliases: [
      {
        fn_name: "tab_panel",
        package: "shiny",
      },
    ],
  },
  py_info: {
    fn_name: "ui.nav",
    package: "shiny",
  },
  title: "Nav Panel",
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
