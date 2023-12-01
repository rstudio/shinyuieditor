import icon from "../../assets/icons/shinyPlot.png";
import { PlotPlaceholder } from "../../components/PlotPlaceholder/PlotPlaceholder";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";
import { InputOutputTitle } from "../utils/InputOutputTitle";

import { output_plotly } from "./output_plotly";

import "./styles.scss";

export const plotlyPlotlyOutputInfo = addEditorInfoToUiNode(output_plotly, {
  iconSrc: icon,
  UiComponent: ({
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
