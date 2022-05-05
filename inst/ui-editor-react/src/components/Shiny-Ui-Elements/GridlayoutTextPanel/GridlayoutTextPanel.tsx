import * as React from "react";

import type { UiNodeComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import { useGridItemSwapping } from "../GridlayoutVerticalStackPanel/useGridItemSwapping";

import type { GridlayoutTextPanelProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutTextPanel: UiNodeComponent<GridlayoutTextPanelProps> = ({
  uiArguments: { content: title, area, h_align },
  children,
  nodeInfo: { path },
  eventHandlers,
  compRef,
}) => {
  useGridItemSwapping({ containerRef: compRef, area, path });

  return (
    <div
      ref={compRef}
      className={classes.textPanel + " gridlayout-textPanel"}
      style={{ gridArea: area, justifyItems: h_align }}
      aria-label={"gridlayout-textPanel"}
      {...eventHandlers}
    >
      <h1>{title}</h1>
      {children}
    </div>
  );
};
export default GridlayoutTextPanel;
