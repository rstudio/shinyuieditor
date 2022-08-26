import containerIcon from "assets/icons/shinyContainer.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyTabPanelSettings } from "./SettingsPanel";
import ShinyTabPanel from "./ShinyTabPanel";

export type TabPanelSettings = {
  title: string;
};

export const shinyTabPanelDefaultSettings: TabPanelSettings = {
  title: "NODE NAME",
};

export const shinyTabPanelInfo: UiComponentInfo<TabPanelSettings> = {
  title: "Tab Panel",
  UiComponent: ShinyTabPanel,
  SettingsComponent: ShinyTabPanelSettings,
  acceptsChildren: true,
  defaultSettings: shinyTabPanelDefaultSettings,
  iconSrc: containerIcon,
  category: "NODE CATEGORY",
  description: "DESCRIPTION OF NODE",
};
