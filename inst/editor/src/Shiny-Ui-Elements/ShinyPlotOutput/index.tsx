import plotIcon from "../../assets/icons/shinyPlot.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import { nodeInfoFactory } from "../nodeInfoFactory";

import ShinyPlotOutput from "./ShinyPlotOutput";

export type ShinyPlotOutputProps = {
  outputId: string;
  width?: CSSMeasure;
  height?: CSSMeasure;
};

export const shinyPlotOutputInfo = nodeInfoFactory<ShinyPlotOutputProps>()({
  id: "plotOutput",
  r_info: {
    fn_name: "plotOutput",
    package: "shiny",
  },
  py_info: {
    fn_name: "ui.output_plot",
    package: "shiny",
  },
  title: "Plot Output",
  takesChildren: false,
  UiComponent: ShinyPlotOutput,
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
  serverBindings: {
    outputs: {
      outputIdKey: "outputId",
      renderScaffold: `renderPlot({\n  #Plot code goes here\n  $0plot(rnorm(100))\n})`,
    },
  },
  iconSrc: plotIcon,
  category: "Outputs",
  description: "Render a `renderPlot()` within an application page.",
});

export default ShinyPlotOutput;
