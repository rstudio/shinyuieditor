import icon from "../../assets/icons/shinyPlot.png";
import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridCardPlot from "./GridlayoutGridCardPlot";

export interface GridlayoutGridCardPlotProps {
  area: string;
  outputId?: string;
}

export const gridlayoutGridCardPlotInfo: UiComponentInfo<GridlayoutGridCardPlotProps> =
  {
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
        defaultValue: (node) => {
          if (!node) return "MyPlot";
          return "area" in node.uiArguments ? node.uiArguments.area : "MyPlot";
        },
        optional: true,
      },
    },
    // If the outputId is undefined we use the area as our id but otherwise we use the standard
    serverOutputId: (args) => (args.outputId ? "outputId" : "area"),
    acceptsChildren: false,
    iconSrc: icon,
    category: "gridlayout",
    description: `A wrapper for \`shiny::plotOutput()\` that uses \`gridlayout\`-friendly sizing defaults. 
    For when you want to have a grid area filled entirely with a single plot.`,
  };

export default GridlayoutGridCardPlot;
