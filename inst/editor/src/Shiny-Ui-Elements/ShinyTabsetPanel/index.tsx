import icon from "assets/icons/tabsetPanel.png";
import { getFirstTabName, getTabNames } from "components/Tabs/Tabset/utils";

import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyTabsetPanel from "./ShinyTabsetPanel";

export type TabsetPanelSettings = { id?: string; selected?: string };

export const shinyTabsetPanelInfo: UiComponentInfo<TabsetPanelSettings> = {
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
      defaultValue: (node) => (node ? getFirstTabName(node) : "First Tab"),
      choices: (node) => (node ? getTabNames(node) : ["First Tab"]),
    },
  },
  acceptsChildren: true,
  iconSrc: icon,
  category: "Tabs",
  description: "A container filled with tabs",
};
