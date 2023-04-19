import { grid_card_plot } from "ui-node-definitions/src/gridlayout/Grid_Card_Plot";

import icon from "../../../assets/icons/shinyPlot.png";
import { mergeClasses } from "../../../utils/mergeClasses";
import type { UiComponent_from_info } from "../../add_editor_info_to_ui_node";
import { add_editor_info_to_ui_node } from "../../add_editor_info_to_ui_node";
import { PlotPlaceholder } from "../../ShinyPlotOutput/PlotPlaceholder";
import { BsCard } from "../Utils/GridLayoutPanelHelpers/GridCards";
import { useGridItemSwapping } from "../Utils/useGridItemSwapping";

import classes from "./styles.module.css";

const GridlayoutGridCardPlot: UiComponent_from_info<typeof grid_card_plot> = ({
  namedArgs: { outputId, area },
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

export const gridlayoutGridCardPlotInfo = add_editor_info_to_ui_node(
  grid_card_plot,
  {
    iconSrc: icon,
    component: GridlayoutGridCardPlot,
  }
);
