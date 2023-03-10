import icon from "../../assets/icons/shinyContainer.png";
import { nodeInfoFactory } from "../nodeInfoFactory";

import { PkgNodeName } from "./Component";

export type NodeNameSettings = {
  name: string;
};

export const pkgNodeNameInfo = nodeInfoFactory<NodeNameSettings>()({
  library: "PKG_NAME",
  name: "node_name",
  title: "NODE NAME",
  takesChildren: false,
  UiComponent: PkgNodeName,
  settingsInfo: {
    name: {
      label: "Name of node",
      inputType: "string",
      defaultValue: "NODE NAME",
    },
  },
  iconSrc: icon,
  category: "NODE CATEGORY",
  description: "DESCRIPTION OF NODE",
});
