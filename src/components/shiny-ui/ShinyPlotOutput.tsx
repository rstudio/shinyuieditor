import styled from "@emotion/styled";
import * as React from "react";
import { GoGraph } from "react-icons/go";
import { makeBoxShadow } from "utils/css-helpers";

export interface ShinyPlotOutputProps {
  name: string;
  width: string;
  height: string;
}

function ShinyPlotOutput({
  name,
  width = "200px",
  height = "200px",
}: ShinyPlotOutputProps) {
  return (
    <PlotHolder style={{ height, width }}>
      <div style={{ gridArea: "1/1", placeSelf: "center" }}>
        <GoGraph size={`calc(${width}/2)`} />
      </div>
      <div style={{ gridArea: "1/1", placeSelf: "end" }}>
        This is a plot with the name {name}!
      </div>
    </PlotHolder>
  );
}

const PlotHolder = styled.div({
  outline: "1px solid var(--rstudio-grey)",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  padding: "1rem",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});

export default ShinyPlotOutput;
