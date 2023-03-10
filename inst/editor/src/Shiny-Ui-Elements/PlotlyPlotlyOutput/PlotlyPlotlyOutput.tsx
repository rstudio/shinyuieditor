import { PlotPlaceholder } from "../../components/PlotPlaceholder/PlotPlaceholder";
import { InputOutputTitle } from "../InputOutputTitle";
import type { UiNodeComponent } from "../uiNodeTypes";

import type { PlotlyOutputSettings } from "./index";

import "./styles.scss";

const PlotlyPlotlyOutput: UiNodeComponent<
  PlotlyOutputSettings,
  { TakesChildren: false }
> = ({
  uiArguments: { outputId, width = "100%", height = "400px" },
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
};

export default PlotlyPlotlyOutput;
