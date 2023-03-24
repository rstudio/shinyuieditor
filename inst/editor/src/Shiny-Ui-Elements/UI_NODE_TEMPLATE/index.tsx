import icon from "../../assets/icons/shinyContainer.png";
import { nodeInfoFactory } from "../nodeInfoFactory";
import { pathToString } from "../nodePathUtils";
import type { UiNodeComponent } from "../uiNodeTypes";

import styles from "./styles.module.css";

type NodeNameSettings = {
  name: string;
};

const NodeComponent: UiNodeComponent<
  NodeNameSettings,
  { TakesChildren: true }
> = ({ uiArguments, uiChildren, path, wrapperProps }) => {
  return (
    <div className={styles.container} {...wrapperProps}>
      <p>NODE NAME: {uiArguments.name}</p>
      <p>Path: {pathToString(path)}</p>
      <p>There are {uiChildren?.length ?? 0} children</p>
    </div>
  );
};

export const pkgNodeNameInfo = nodeInfoFactory<NodeNameSettings>()({
  library: "PKG_NAME",
  name: "node_name",
  title: "NODE NAME",
  takesChildren: true,
  UiComponent: NodeComponent,
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
