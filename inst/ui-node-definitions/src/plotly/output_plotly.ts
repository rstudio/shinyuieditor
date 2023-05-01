import type { CSSMeasure } from "../inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";

export const output_plotly = nodeInfoFactory<{
  outputId: string;
  width?: CSSMeasure;
  height?: CSSMeasure;
}>()({
  id: "plotlyOutput",
  r_info: {
    fn_name: "plotlyOutput",
    package: "plotly",
    output_bindings: {
      outputIdKey: "outputId",
      renderScaffold: `renderPlotly({\n  plot_ly(z = ~volcano, type = "surface")\n})`,
    },
  },
  title: "Plotly Plot",
  takesChildren: false,
  settingsInfo: {
    outputId: {
      inputType: "string",
      label: "Output ID for plot",
      defaultValue: "plot",
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
  category: "Plotting",
  description: "Output for interactive `plotly` plots.",
});
