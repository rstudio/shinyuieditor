import { getFirstTabName, getTabNames } from "../Bslib/page_navbar";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { ShinyUiParentNode } from "../ShinyUiNode";

export const tabset_panel = nodeInfoFactory<{
  id?: string;
  selected?: string;
}>()({
  id: "tabsetPanel",
  r_info: {
    fn_name: "tabsetPanel",
    package: "shiny",
  },
  py_info: {
    fn_name: "ui.navset_tab",
    package: "shiny",
  },
  title: "Tabset Panel",
  takesChildren: true,
  settingsInfo: {
    id: {
      inputType: "id",
      label: "Id for tabset",
      defaultValue: "tabset-default-id",
      inputOrOutput: "input",
      optional: true,
    },
    selected: {
      inputType: "dropdown",
      optional: true,
      label: "Selected tab on load",
      defaultValue: (node) =>
        node ? getFirstTabName(node as ShinyUiParentNode) : "First Tab",
      choices: (node) =>
        node ? getTabNames(node as ShinyUiParentNode) : ["First Tab"],
    },
  },
  category: "Tabs",
  description: "A container filled with tabs",
});
