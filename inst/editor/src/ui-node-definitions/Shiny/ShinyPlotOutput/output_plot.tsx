import type { CSSMeasure } from "../../inputFieldTypes";
import { nodeInfoFactory } from "../../nodeInfoFactory";

import { StaticPlotPlaceholder } from "./StaticPlotPlaceholder";
import classes from "./styles.module.css";

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
      renderScaffold: {
        fn_name: "renderPlot",
        fn_body: `#Plot code goes here\n$0plot(rnorm(100))`,
      },
    },
  },
  py_info: {
    fn_name: "ui.output_plot",
    package: "shiny",
    output_bindings: {
      renderScaffold: {
        fn_name: `@render.plot(alt="A plot")`,
        fn_body: `x = 100 + 15 * np.random.randn(437)\nplt.hist(x, input.n(), density=True)`,
      },
    },
  },
  title: "Plot Output",
  takesChildren: false,
  settingsInfo: {
    outputId: {
      inputType: "id",
      inputOrOutput: "output",
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
  category: "Outputs",
  description: "Render a `renderPlot()` within an application page.",
  ui_component: ({
    namedArgs: { outputId, width, height = "400px" },
    wrapperProps,
  }) => {
    return (
      <div
        className={classes.container}
        style={{ height, width }}
        {...wrapperProps}
      >
        <StaticPlotPlaceholder outputId={outputId} />
      </div>
    );
  },
});
