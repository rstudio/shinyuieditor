import icon from "../../assets/icons/shinyPlot.png";
import { PlotPlaceholder } from "../../components/PlotPlaceholder/PlotPlaceholder";
import type { CSSMeasure } from "../inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";
import { InputOutputTitle } from "../utils/InputOutputTitle";

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
      renderScaffold: {
        fn_name: "renderPlotly",
        fn_body: `plot_ly(z = ~volcano, type = "surface")`,
      },
    },
  },
  title: "Plotly Plot",
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
  iconSrc: icon,
  category: "Plotting",
  description: "Output for interactive `plotly` plots.",
  ui_component: ({
    namedArgs: { outputId, width = "100%", height = "400px" },
    wrapperProps,
  }) => {
    return (
      <div
        className="plotlyPlotlyOutput"
        style={{ height, width }}
        {...wrapperProps}
      >
        <PlotPlaceholder
          title={
            <span className="title-bar">
              <InputOutputTitle type="output" name={outputId} />
              <span className="plotly-name">Plotly</span>
            </span>
          }
        />
      </div>
    );
  },
});
