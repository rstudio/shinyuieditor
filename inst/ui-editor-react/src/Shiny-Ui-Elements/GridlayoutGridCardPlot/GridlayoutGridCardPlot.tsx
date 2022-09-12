import * as React from "react";

import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import { BsCard } from "../../components/Grids/GridLayoutPanelHelpers/GridCards";
import { useGridItemSwapping } from "../GridlayoutGridCard/useGridItemSwapping";
import { PlotPlaceholder } from "../ShinyPlotOutput/PlotPlaceholder";

import type { GridlayoutGridCardPlotProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutGridCardPlot: UiNodeComponent<GridlayoutGridCardPlotProps> = ({
  uiArguments: { outputId, area },
  path,
  wrapperProps,
}) => {
  const compRef = React.useRef<HTMLDivElement>(null);

  useGridItemSwapping({ containerRef: compRef, area, path });

  return (
    <BsCard
      ref={compRef}
      style={{ gridArea: area }}
      className={classes.gridCardPlot + " gridlayout-gridCardPlot"}
      {...wrapperProps}
    >
      <PlotPlaceholder outputId={outputId ?? area} />
    </BsCard>
  );
};
export default GridlayoutGridCardPlot;
