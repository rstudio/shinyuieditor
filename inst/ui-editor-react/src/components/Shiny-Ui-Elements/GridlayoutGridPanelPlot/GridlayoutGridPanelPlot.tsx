import * as React from "react";

import type { UiNodeComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import { useGridItemSwapping } from "../GridlayoutVerticalStackPanel/useGridItemSwapping";
import { PlotPlaceholder } from "../ShinyPlotOutput/PlotPlaceholder";

import type { GridlayoutGridPanelPlotProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutGridPanelPlot: UiNodeComponent<
  GridlayoutGridPanelPlotProps
> = ({
  uiArguments: { outputId, area },
  children,
  nodeInfo: { path },
  eventHandlers,
  compRef,
}) => {
  useGridItemSwapping({ containerRef: compRef, area, path });

  return (
    <div
      ref={compRef}
      style={{ gridArea: area }}
      className={classes.gridPanelPlot + " gridlayout-gridPanelPlot"}
      aria-label={"gridlayout-gridPanelPlot"}
      {...eventHandlers}
    >
      <PlotPlaceholder outputId={outputId} compRef={compRef} />
      {children}
    </div>
  );
};
export default GridlayoutGridPanelPlot;
