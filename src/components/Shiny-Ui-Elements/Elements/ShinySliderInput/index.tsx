import styled from "@emotion/styled";
import { ShinyUiComponent } from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";
import {
  buildSliderSettings,
  ShinySliderInputProps,
  sliderDefaultSettings,
} from "./arguments";

const ShinySliderInput: ShinyUiComponent<ShinySliderInputProps> = (
  props: ShinySliderInputProps
) => {
  const {
    inputId = "shiny::sliderInput",
    min,
    max,
    value,
  } = { ...sliderDefaultSettings, ...props };
  const width = "200px";
  const height = "auto";
  const settings = buildSliderSettings({ min, max, value });
  const [currentVal, setCurrentVal] = React.useState(settings.value);
  return (
    <SliderHolder
      style={{ height, width }}
      className={"shiny::sliderInput"}
      aria-label={"shiny::sliderInput"}
    >
      <div style={{ gridArea: "1/1", placeSelf: "center", maxWidth: "300px" }}>
        <div>
          Min: {settings.min}, Max: {settings.max}
        </div>
        <input
          type="range"
          min={settings.min}
          max={settings.max}
          value={currentVal}
          onChange={(e) => setCurrentVal(Number(e.target.value))}
          className="slider"
          aria-label={"slider input"}
        />
        <div>Current: {currentVal}</div>
      </div>
    </SliderHolder>
  );
};

export default ShinySliderInput;

const SliderHolder = styled.div({
  outline: "1px solid var(--rstudio-grey)",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  padding: "1rem",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});
