import * as React from "react";

import { BsCard } from "components/Grids/GridLayoutPanelHelpers/GridCards";
import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import { useGridItemSwapping } from "../GridlayoutGridCard/useGridItemSwapping";

import type { GridlayoutGridCardTextProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutGridCardText: UiNodeComponent<GridlayoutGridCardTextProps> = ({
  uiArguments: { content: title, area, alignment },
  path,
  wrapperProps,
}) => {
  const compRef = React.useRef<HTMLDivElement>(null);

  useGridItemSwapping({ containerRef: compRef, area, path });

  return (
    <BsCard
      ref={compRef}
      className={classes.textPanel + " gridlayout-textPanel"}
      style={{ gridArea: area, justifyItems: alignment }}
      {...wrapperProps}
    >
      <h1>{title}</h1>
    </BsCard>
  );
};
export default GridlayoutGridCardText;
