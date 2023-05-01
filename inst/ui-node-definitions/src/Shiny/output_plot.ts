import type { CSSMeasure } from "../inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";

export const output_plot = nodeInfoFactory<{
  outputId: string;
  width?: CSSMeasure;
  height?: CSSMeasure;
}>()({
  id: "plotOutput",
  r_info: {
    fn_name: "plotOutput",
    package: "shiny",
    output_bindings: {
      outputIdKey: "outputId",
      renderScaffold: `renderPlot({\n  #Plot code goes here\n  $0plot(rnorm(100))\n})`,
    },
  },
  py_info: {
    fn_name: "ui.output_plot",
    package: "shiny",
    output_bindings: {
      outputIdKey: "outputId",
      renderScaffold: `#TO IMPLEMEMNT`,
    },
  },
  title: "Plot Output",
  takesChildren: false,
  settingsInfo: {
    outputId: {
      inputType: "string",
      label: "Output ID for plot",
      defaultValue: "plot",
      py_name: "id",
    },
    width: {
      label: "Width",
      inputType: "cssMeasure",
      defaultValue: "100%",
      optional: true,
    },
    height: {
      label: "Height",
      inputType: "cssMeasure",
      defaultValue: "400px",
      optional: true,
    },
  },
  category: "Outputs",
  description: "Render a `renderPlot()` within an application page.",
});
