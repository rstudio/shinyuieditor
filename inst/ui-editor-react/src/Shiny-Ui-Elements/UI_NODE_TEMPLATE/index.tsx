import iconSrc from "assets/icons/shinyContainer.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import PkgNodeName from "./Component";
import { PkgNodeNameSettings } from "./SettingsPanel";

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
  iconSrc,
  category: "NODE CATEGORY",
  description: "DESCRIPTION OF NODE",
};

export default pkgNodeNameInfo;
