/** @jsxImportSource @emotion/react */
import css from "@emotion/css";
import * as React from "react";
import { BiSliderAlt } from "react-icons/bi";
import { makeBoxShadow } from "utils/css-helpers";

interface ShinySliderInputProps {
  id: string;
  width: string;
  height: string;
}

function ShinySliderInput({
  id,
  width = "200px",
  height = "200px",
}: ShinySliderInputProps) {
  return (
    <div style={{ height, width }} css={sliderStyles}>
      <div style={{ gridArea: "1/1", placeSelf: "center" }}>
        <BiSliderAlt size={`calc(${width}/2)`} />
      </div>
      <div style={{ gridArea: "1/1", placeSelf: "end" }}>
        This is a slider with the id {id}!
      </div>
    </div>
  );
}

const sliderStyles = css({
  outline: "1px solid var(--rstudio-grey)",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  padding: "1rem",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});

export default ShinySliderInput;
