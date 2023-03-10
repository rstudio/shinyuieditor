import { mergeClasses } from "../../../utils/mergeClasses";
import { PlotPlaceholder } from "../../ShinyPlotOutput/PlotPlaceholder";
import type { UiNodeComponent } from "../../uiNodeTypes";
import { BsCard } from "../Utils/GridLayoutPanelHelpers/GridCards";
import { useGridItemSwapping } from "../Utils/useGridItemSwapping";

import type { GridlayoutGridCardPlotProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutGridCardPlot: UiNodeComponent<
  GridlayoutGridCardPlotProps,
  { TakesChildren: false }
> = ({ uiArguments: { outputId, area }, path, wrapperProps }) => {
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
