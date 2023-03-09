import plotIcon from "../../assets/icons/shinyPlot.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyPlotOutput from "./ShinyPlotOutput";

export type ShinyPlotOutputProps = {
  outputId: string;
  width?: CSSMeasure;
  height?: CSSMeasure;
};

export const shinyPlotOutputInfo: UiComponentInfo<ShinyPlotOutputProps> = {
  library: "shiny",
  name: "plotOutput",
  title: "Plot Output",
  UiComponent: ShinyPlotOutput,
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
  serverBindings: {
    outputs: {
      outputIdKey: "outputId",
      renderScaffold: `renderPlot({\n  #Plot code goes here\n  $0plot(rnorm(100))\n})`,
    },
  },
  acceptsChildren: false,
  iconSrc: plotIcon,
  category: "Outputs",
  description: "Render a `renderPlot()` within an application page.",
};

export default ShinyPlotOutput;
