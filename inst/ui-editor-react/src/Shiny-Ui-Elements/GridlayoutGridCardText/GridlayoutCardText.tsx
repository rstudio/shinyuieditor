import * as React from "react";

import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import { useGridItemSwapping } from "../GridlayoutGridCard/useGridItemSwapping";
import { BsCard } from "../GridLayoutPanelHelpers/GridCards";

import type { GridlayoutGridCardTextProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutGridCardText: UiNodeComponent<GridlayoutGridCardTextProps> = ({
  uiArguments: { content: title, area, alignment },
  nodeInfo: { path },
  compRef,
  wrapperProps,
}) => {
  useGridItemSwapping({ containerRef: compRef, area, path });

  return (
    <BsCard
      ref={compRef}
      className={classes.textPanel + " gridlayout-textPanel"}
      style={{ gridArea: area, justifyItems: alignment }}
      aria-label={"gridlayout-textPanel"}
      {...wrapperProps}
    >
      <h1>{title}</h1>
    </BsCard>
  );
};
export default GridlayoutGridCardText;
