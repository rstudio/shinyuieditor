import { nodeInfoFactory } from "../nodeInfoFactory";

import { grid_parents } from "./grid_card";

export const grid_card_plot = nodeInfoFactory<{
  area: string;
  outputId?: string;
}>()({
  id: "grid_card_plot",
  r_info: {
    fn_name: "grid_card_plot",
    package: "gridlayout",
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
      inputType: "string",
      defaultValue: function (node): string {
        if (node && "area" in node.namedArgs) {
          return node.namedArgs.area as string;
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
  allowedParents: grid_parents,
  category: "gridlayout",
  description: `A wrapper for \`shiny::plotOutput()\` that uses \`gridlayout\`-friendly sizing defaults. 
    For when you want to have a grid area filled entirely with a single plot.`,
});