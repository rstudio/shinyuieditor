import * as React from "react";

import type { UiNodeComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import { useGridItemSwapping } from "../GridlayoutGridCard/useGridItemSwapping";
import { BsCard } from "../GridLayoutPanelHelpers/GridCards";
import { PlotPlaceholder } from "../ShinyPlotOutput/PlotPlaceholder";

import type { GridlayoutGridCardPlotProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutGridCardPlot: UiNodeComponent<GridlayoutGridCardPlotProps> = ({
  uiArguments: { outputId, area },
  children,
  nodeInfo: { path },
  eventHandlers,
  compRef,
}) => {
  useGridItemSwapping({ containerRef: compRef, area, path });

  return (
    <BsCard
      ref={compRef}
      style={{ gridArea: area }}
      className={classes.gridCardPlot + " gridlayout-gridCardPlot"}
      aria-label={"gridlayout-gridCardPlot"}
      {...eventHandlers}
    >
      <PlotPlaceholder outputId={outputId ?? area} />
      {children}
    </BsCard>
  );
};
export default GridlayoutGridCardPlot;
