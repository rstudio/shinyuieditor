import icon from "../../assets/icons/tabsetPanel.png";
import {
  getFirstTabName,
  getTabNames,
} from "../../components/Tabs/Tabset/utils";
import type { ShinyUiParentNode, UiComponentInfo } from "../uiNodeTypes";

import ShinyTabsetPanel from "./ShinyTabsetPanel";

export type TabsetPanelSettings = { id?: string; selected?: string };

export const shinyTabsetPanelInfo: UiComponentInfo<TabsetPanelSettings> = {
  library: "shiny",
  name: "tabsetPanel",
  title: "Tabset Panel",
  UiComponent: ShinyTabsetPanel,
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
  acceptsChildren: true,
  iconSrc: icon,
  category: "Tabs",
  description: "A container filled with tabs",
};
