import icon from "assets/icons/tabsetPanel.png";
import { getFirstTabName, getTabNames } from "components/Tabs/Tabset/utils";

import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyTabsetPanel from "./ShinyTabsetPanel";

export type TabsetPanelSettings = { id?: string; selected?: string };

export const shinyTabsetPanelDefaultSettings: TabsetPanelSettings = {};

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
      defaultValue: getFirstTabName,
      choices: getTabNames,
    },
  },
  acceptsChildren: true,
  defaultSettings: shinyTabsetPanelDefaultSettings,
  iconSrc: icon,
  category: "Tabs",
  description: "A container filled with tabs",
};

export default shinyTabsetPanelInfo;
