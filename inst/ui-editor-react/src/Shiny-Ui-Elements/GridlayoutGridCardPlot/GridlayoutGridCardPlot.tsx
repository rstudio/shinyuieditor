import * as React from "react";

import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import { useGridItemSwapping } from "../GridlayoutGridCard/useGridItemSwapping";
import { BsCard } from "../GridLayoutPanelHelpers/GridCards";
import { PlotPlaceholder } from "../ShinyPlotOutput/PlotPlaceholder";

import type { GridlayoutGridCardPlotProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutGridCardPlot: UiNodeComponent<GridlayoutGridCardPlotProps> = ({
  uiArguments: { outputId, area },
  nodeInfo: { path },
  compRef,
}) => {
  useGridItemSwapping({ containerRef: compRef, area, path });

  return (
    <BsCard
      ref={compRef}
      style={{ gridArea: area }}
      className={classes.gridCardPlot + " gridlayout-gridCardPlot"}
      aria-label={"gridlayout-gridCardPlot"}
    >
      <PlotPlaceholder outputId={outputId ?? area} />
    </BsCard>
  );
};
export default GridlayoutGridCardPlot;
