import * as React from "react";

import { BsCard } from "../../components/Grids/GridLayoutPanelHelpers/GridCards";
import { mergeClasses } from "../../utils/mergeClasses";
import { useGridItemSwapping } from "../GridlayoutGridCard/useGridItemSwapping";
import { PlotPlaceholder } from "../ShinyPlotOutput/PlotPlaceholder";
import type { UiNodeComponent } from "../uiNodeTypes";

import type { GridlayoutGridCardPlotProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutGridCardPlot: UiNodeComponent<GridlayoutGridCardPlotProps> = ({
  uiArguments: { outputId, area },
  path,
  wrapperProps,
}) => {
  const compRef = useGridItemSwapping({ area, path });

  return (
    <BsCard
      ref={compRef}
      style={{ gridArea: area }}
      className={mergeClasses(classes.gridCardPlot, "gridlayout-gridCardPlot")}
      {...wrapperProps}
    >
      <PlotPlaceholder outputId={outputId ?? area} />
    </BsCard>
  );
};
export default GridlayoutGridCardPlot;
