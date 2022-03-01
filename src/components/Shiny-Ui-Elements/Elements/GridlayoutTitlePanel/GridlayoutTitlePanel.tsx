import * as React from "react";

import { UiNodeComponent } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";

import { GridlayoutTitlePanelProps } from "./index";
import classes from "./styles.module.css";

const GridlayoutTitlePanel: UiNodeComponent<GridlayoutTitlePanelProps> = ({
  uiArguments: { title, area },
  children,
  ...passthroughProps
}) => {
  return (
    <div
      className={classes.titlePanel + " gridlayout-titlePanel"}
      style={{ gridArea: area }}
      aria-label={"gridlayout-titlePanel"}
      {...passthroughProps}
    >
      <h1>{title}</h1>
      {children}
    </div>
  );
};
export default GridlayoutTitlePanel;
