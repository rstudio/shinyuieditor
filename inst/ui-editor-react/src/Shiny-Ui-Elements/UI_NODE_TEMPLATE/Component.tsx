import type { UiContainerNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { NodeNameSettings } from "./index";

import classes from "./styles.module.css";

const PkgNodeName: UiContainerNodeComponent<NodeNameSettings> = ({
  uiArguments,
  uiChildren,
  nodeInfo: { path },
  children,
  eventHandlers,
  compRef,
}) => {
  return <div className={classes.container}>NODE NAME: {uiArguments.name}</div>;
};

export default PkgNodeName;
