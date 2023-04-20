import { nodeInfoFactory } from "../nodeInfoFactory";
import type { ShinyUiParentNode } from "../uiNodeTypes";

import { getFirstTabName, getTabNames } from "./page_navbar";

export const tabset_panel = nodeInfoFactory<{
  id?: string;
  selected?: string;
}>()({
  id: "tabsetPanel",
  r_info: {
    fn_name: "tabsetPanel",
    package: "shiny",
  },
  title: "Tabset Panel",
  takesChildren: true,
  settingsInfo: {
    id: {
      inputType: "string",
      label: "Id for tabset",
      defaultValue: "tabset-default-id",
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
