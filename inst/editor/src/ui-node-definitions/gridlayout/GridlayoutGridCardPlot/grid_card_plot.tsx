import icon from "../../../assets/icons/shinyPlot.png";
import { mergeClasses } from "../../../utils/mergeClasses";
import type { UiNodeComponent } from "../../nodeInfoFactory";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import { StaticPlotPlaceholder } from "../../Shiny/ShinyPlotOutput/StaticPlotPlaceholder";
import { grid_parents } from "../GridlayoutCard/grid_card";
import { BsCard } from "../Utils/BsCard";
import { useGridItemSwapping } from "../Utils/useGridItemSwapping";

import classes from "./styles.module.css";

type GridCardPlotArgs = {
  area: string;
  outputId?: string;
};

const GridlayoutGridCardPlot: UiNodeComponent<
  GridCardPlotArgs,
  { TakesChildren: false }
> = ({ namedArgs: { outputId, area }, path, wrapperProps }) => {
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

export const grid_card_plot = nodeInfoFactory<{
  area: string;
  outputId?: string;
}>()({
  id: "grid_card_plot",
  r_info: {
    fn_name: "grid_card_plot",
    package: "gridlayout",
    output_bindings: {
      // If the outputId is undefined we use the area as our id but otherwise we use the standard
      outputIdKey: (args) => (args.outputId ? "outputId" : "area"),
      renderScaffold: {
        fn_name: "renderPlot",
        fn_body: "#Plot code goes here\n$0plot(rnorm(100))",
      },
    },
  },
  title: "Grid Plot Card",
  takesChildren: false,
  settingsInfo: {
    area: {
      label: "Name of grid area",
      inputType: "string",
      defaultValue: "default-area",
    },
    outputId: {
      label: "Output ID",
      inputType: "id",
      defaultValue: function (node): string {
        if (node && "area" in node.namedArgs) {
          return node.namedArgs.area as string;
        }
        return "MyPlot";
      },
      optional: true,
    },
  },
  allowedParents: grid_parents,
  iconSrc: icon,
  category: "gridlayout",
  description: `A wrapper for \`shiny::plotOutput()\` that uses \`gridlayout\`-friendly sizing defaults. 
    For when you want to have a grid area filled entirely with a single plot.`,
  ui_component: GridlayoutGridCardPlot,
});
