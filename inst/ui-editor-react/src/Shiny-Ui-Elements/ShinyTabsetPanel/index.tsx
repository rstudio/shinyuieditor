import icon from "assets/icons/tabsetPanel.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyTabsetPanelSettings } from "./SettingsPanel";
import ShinyTabsetPanel from "./ShinyTabsetPanel";

export type TabsetPanelSettings = {};

export const shinyTabsetPanelDefaultSettings: TabsetPanelSettings = {};

export const shinyTabsetPanelInfo: UiComponentInfo<TabsetPanelSettings> = {
  title: "Tabset Panel",
  UiComponent: ShinyTabsetPanel,
  SettingsComponent: ShinyTabsetPanelSettings,
  acceptsChildren: true,
  defaultSettings: shinyTabsetPanelDefaultSettings,
  iconSrc: icon,
  category: "Tabs",
  description: "A container filled with tabs",
};

export default shinyTabsetPanelInfo;
