import styled from "@emotion/styled";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";
import { buildSliderSettings, ShinySliderInputProps } from "./arguments";

const ShinySliderInput: React.FC<ShinySliderInputProps> = ({
  children,
  ...props
}) => {
  const width = "200px";
  const height = "auto";
  const settings = buildSliderSettings({ ...props });
  const [currentVal, setCurrentVal] = React.useState(settings.value);
  return (
    <SliderHolder
      style={{ height, width }}
      className={"shiny::sliderInput"}
      aria-label={"shiny::sliderInput"}
    >
      <div style={{ gridArea: "1/1", placeSelf: "center", maxWidth: "300px" }}>
        <div>{settings.label}</div>
        <input
          type="range"
          min={settings.min}
          max={settings.max}
          value={currentVal}
          onChange={(e) => setCurrentVal(Number(e.target.value))}
          className="slider"
          aria-label={"slider input"}
        />
        <div>
          Min: {settings.min}, Max: {settings.max}
        </div>
        <div>
          input${settings.inputId} = {currentVal}
        </div>
      </div>
      {children}
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
