import styled from "@emotion/styled";
import * as React from "react";
import { BiSliderAlt } from "react-icons/bi";
import { makeBoxShadow } from "utils/css-helpers";

export type ShinySliderInputProps = Partial<{
  name: string;
  width: string;
  height: string;
}>;

export default function ShinySliderInput({
  name = "shiny-sliderInput",
  width = "200px",
  height = "200px",
}: ShinySliderInputProps) {
  return (
    <SliderHolder
      style={{ height, width }}
      className={"shiny-sliderInput"}
      aria-label={"shiny-sliderInput"}
    >
      <div style={{ gridArea: "1/1", placeSelf: "center" }}>
        <BiSliderAlt size={`calc(${width}/2)`} />
      </div>
      <div style={{ gridArea: "1/1", placeSelf: "end" }}>
        This is a slider with the name {name}!
      </div>
    </SliderHolder>
  );
}

const SliderHolder = styled.div({
  outline: "1px solid var(--rstudio-grey)",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  padding: "1rem",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});
