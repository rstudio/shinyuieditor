import containerIcon from "assets/icons/shinyContainer.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyTabPanelSettings } from "./SettingsPanel";
import ShinyTabPanel from "./ShinyTabPanel";

// Steps to converting to your node
// - Copy the UI_NODE_TEMPLATE/ folder and name it ShinyTabPanel/
// - Find-Replace (Make sure Match-Case is turned on)
//   - "ShinyTabPanel"
//   - "shinyTabPanel"
//   - "tabPanel"
// - Update settings type/defaults
// - Update info object with correct title, category, and description
// - Add to the uiNodeTypes.ts file directory

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

export default shinyTabPanelInfo;
