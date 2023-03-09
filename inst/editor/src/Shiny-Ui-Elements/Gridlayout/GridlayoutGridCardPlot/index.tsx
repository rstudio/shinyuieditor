import icon from "../../../assets/icons/shinyPlot.png";
import { nodeInfoFactory } from "../../ShinyActionButton/makeUiNodeInfo";
import { grid_container_nodes } from "../grid_container_nodes";

import GridlayoutGridCardPlot from "./GridlayoutGridCardPlot";

export type GridlayoutGridCardPlotProps = {
  area: string;
  outputId?: string;
};

export const gridlayoutGridCardPlotInfo =
  nodeInfoFactory<GridlayoutGridCardPlotProps>()({
    library: "gridlayout",
    name: "grid_card_plot",
    title: "Grid Plot Card",
    UiComponent: GridlayoutGridCardPlot,
    settingsInfo: {
      area: {
        label: "Name of grid area",
        inputType: "string",
        defaultValue: "default-area",
      },
      outputId: {
        label: "Output ID",
        inputType: "string",
        defaultValue: function (node): string {
          if (node && "area" in node.uiArguments) {
            return node.uiArguments.area as string;
          }
          return "MyPlot";
        },
        optional: true,
      },
    },
    // If the outputId is undefined we use the area as our id but otherwise we use the standard
    serverBindings: {
      outputs: {
        outputIdKey: (args) => (args.outputId ? "outputId" : "area"),
        renderScaffold: `renderPlot({\n  #Plot code goes here\n  $0plot(rnorm(100))\n})`,
      },
    },
    allowedParents: grid_container_nodes,
    acceptsChildren: false,
    iconSrc: icon,
    category: "gridlayout",
    description: `A wrapper for \`shiny::plotOutput()\` that uses \`gridlayout\`-friendly sizing defaults. 
    For when you want to have a grid area filled entirely with a single plot.`,
  });
