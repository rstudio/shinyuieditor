import type { UiContainerNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { TabPanelSettings } from "./index";

import classes from "./styles.module.css";

const ShinyTabPanel: UiContainerNodeComponent<TabPanelSettings> = ({
  uiArguments,
  uiChildren,
  nodeInfo: { path },
  children,
  eventHandlers,
  compRef,
}) => {
  return (
    <div className={classes.container}>tabPanel name: {uiArguments.title}</div>
  );
};

export default ShinyTabPanel;
