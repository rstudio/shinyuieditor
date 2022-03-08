import * as React from "react";

import type { UiNodeComponent } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";

import type { GridlayoutTitlePanelProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutTitlePanel: UiNodeComponent<GridlayoutTitlePanelProps> = ({
  uiArguments: { title, area },
  children,
  eventHandlers,
  compRef,
}) => {
  return (
    <div
      ref={compRef}
      className={classes.titlePanel + " gridlayout-titlePanel"}
      style={{ gridArea: area }}
      aria-label={"gridlayout-titlePanel"}
      {...eventHandlers}
    >
      <h1>{title}</h1>
      {children}
    </div>
  );
};
export default GridlayoutTitlePanel;
