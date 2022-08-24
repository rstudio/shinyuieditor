import containerIcon from "assets/icons/shinyContainer.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import PkgNodeName from "./Component";
import { PkgNodeNameSettings } from "./SettingsPanel";

// Steps to converting to your node
// - Copy the UI_NODE_TEMPLATE/ folder and name it PkgNodeName/
// - Find-Replace (Make sure Match-Case is turned on)
//   - "PkgNodeName"
//   - "pkgNodeName"
//   - "NodeName"
//   - "nodeName"
// - Update settings type/defaults
// - Update info object with correct title, category, and description

export type NodeNameSettings = {
  name: string;
};

export const pkgNodeNameDefaultSettings: NodeNameSettings = {
  name: "NODE NAME",
};

export const pkgNodeNameInfo: UiComponentInfo<NodeNameSettings> = {
  title: "NODE NAME",
  UiComponent: PkgNodeName,
  SettingsComponent: PkgNodeNameSettings,
  acceptsChildren: true,
  defaultSettings: pkgNodeNameDefaultSettings,
  iconSrc: containerIcon,
  category: "NODE CATEGORY",
  description: "DESCRIPTION OF NODE",
};

export default pkgNodeNameInfo;
