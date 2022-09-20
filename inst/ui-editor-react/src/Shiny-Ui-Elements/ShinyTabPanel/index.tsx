import icon from "assets/icons/tabPanel.png";
import type { UiNodeSettingsInfo } from "components/Inputs/SettingsFormBuilder/inputFieldTypes";

import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyTabPanel from "./ShinyTabPanel";

export const TabPanelSettingsInfo: UiNodeSettingsInfo = {
  title: {
    label: "Title of panel",
    inputType: "string",
    defaultValue: "My Shiny App",
  },
};

export type TabPanelSettings = {
  title: string;
};

export const shinyTabPanelDefaultSettings: TabPanelSettings = {
  title: "Tab Title",
};

export const shinyTabPanelInfo: UiComponentInfo<TabPanelSettings> = {
  title: "Tab Panel",
  UiComponent: ShinyTabPanel,
  settingsInfo: TabPanelSettingsInfo,
  acceptsChildren: true,
  defaultSettings: shinyTabPanelDefaultSettings,
  iconSrc: icon,
  category: "Tabs",
  description:
    "Panel containing content for tab-based interfaces like navbar pages",
};
