import styled from "@emotion/styled";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";

type SliderSettings = {
  min: number;
  val: number;
  max: number;
};

export type ShinySliderInputProps = Partial<
  {
    name: string;
    width: string;
    height: string;
  } & SliderSettings
>;

export default function ShinySliderInput({
  name = "shiny-sliderInput",
  width = "200px",
  height = "auto",
  min,
  max,
  val,
}: ShinySliderInputProps) {
  const settings = buildSliderSettings({ min, max, val });
  const [currentVal, setCurrentVal] = React.useState(settings.val);
  return (
    <SliderHolder
      style={{ height, width }}
      className={"shiny-sliderInput"}
      aria-label={"shiny-sliderInput"}
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
}

export function buildSliderSettings({
  min,
  max,
  val,
  name,
}: Partial<ShinySliderInputProps>) {
  const missingAll =
    typeof min !== "number" &&
    typeof max !== "number" &&
    typeof val !== "number";
  const haveAll =
    typeof min === "number" &&
    typeof max === "number" &&
    typeof val === "number";

  if (!missingAll && !haveAll)
    throw new Error(
      "A minimum, maximum, and starting value are needed for slider."
    );

  if (typeof min !== "number") min = 0;
  if (typeof max !== "number") max = 100;
  if (typeof val !== "number") val = 50;

  if (min > max) {
    throw new Error("Need to define a minimum value that is below the max");
  }

  if (val > max) {
    throw new Error(
      "Cant set starting value of slider above the maximum allowed value"
    );
  }

  if (val < min) {
    throw new Error(
      "Cant set starting value of slider below the minimum allowed value"
    );
  }

  // if (!haveMin) min = 0;

  if (typeof name !== "string") {
    name = "Default slider name";
  }

  return { min, max, val, name };
}

const SliderHolder = styled.div({
  outline: "1px solid var(--rstudio-grey)",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  padding: "1rem",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});
