import icon from "assets/icons/shinyContainer.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import PkgNodeName from "./Component";

export type NodeNameSettings = {
  name: string;
};

export const pkgNodeNameDefaultSettings: NodeNameSettings = {
  name: "NODE NAME",
};

export const pkgNodeNameInfo: UiComponentInfo<NodeNameSettings> = {
  title: "NODE NAME",
  UiComponent: PkgNodeName,
  settingsInfo: {
    name: {
      label: "Name of node",
      inputType: "string",
      defaultValue: "default name",
    },
  },
  acceptsChildren: true,
  iconSrc: icon,
  category: "NODE CATEGORY",
  description: "DESCRIPTION OF NODE",
};

export default pkgNodeNameInfo;
