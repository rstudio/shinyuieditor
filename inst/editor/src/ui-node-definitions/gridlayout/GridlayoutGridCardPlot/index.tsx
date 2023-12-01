import icon from "../../../assets/icons/shinyPlot.png";
import { mergeClasses } from "../../../utils/mergeClasses";
import { StaticPlotPlaceholder } from "../../Shiny/ShinyPlotOutput/StaticPlotPlaceholder";
import type { UiComponentFromInfo } from "../../utils/add_editor_info_to_ui_node";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";
import { BsCard } from "../Utils/BsCard";
import { useGridItemSwapping } from "../Utils/useGridItemSwapping";

import { grid_card_plot } from "./grid_card_plot";
import classes from "./styles.module.css";

const GridlayoutGridCardPlot: UiComponentFromInfo<typeof grid_card_plot> = ({
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
      <StaticPlotPlaceholder outputId={outputId ?? area} />
    </BsCard>
  );
};

export const gridlayoutGridCardPlotInfo = addEditorInfoToUiNode(
  grid_card_plot,
  {
    iconSrc: icon,
    UiComponent: GridlayoutGridCardPlot,
  }
);
