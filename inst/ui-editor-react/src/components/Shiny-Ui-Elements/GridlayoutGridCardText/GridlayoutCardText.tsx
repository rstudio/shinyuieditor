import * as React from "react";

import type { UiNodeComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import { useGridItemSwapping } from "../GridlayoutGridCard/useGridItemSwapping";

import type { GridlayoutGridCardTextProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutGridCardText: UiNodeComponent<GridlayoutGridCardTextProps> = ({
  uiArguments: { content: title, area, alignment },
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
      style={{ gridArea: area, justifyItems: alignment }}
      aria-label={"gridlayout-textPanel"}
      {...eventHandlers}
    >
      <h1>{title}</h1>
      {children}
    </div>
  );
};
export default GridlayoutGridCardText;
