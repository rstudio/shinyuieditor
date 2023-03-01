import { mergeClasses } from "../../../utils/mergeClasses";
import { PlotPlaceholder } from "../../ShinyPlotOutput/PlotPlaceholder";
import type { UiLeafNodeComponent } from "../../uiNodeTypes";
import { useGridItemSwapping } from "../Utils/useGridItemSwapping";
import { BsCard } from "../Utils/GridLayoutPanelHelpers/GridCards";

import type { GridlayoutGridCardPlotProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutGridCardPlot: UiLeafNodeComponent<
  GridlayoutGridCardPlotProps
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