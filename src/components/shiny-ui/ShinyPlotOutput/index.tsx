import styled from "@emotion/styled";
import * as React from "react";
import { GoGraph } from "react-icons/go";
import { makeBoxShadow } from "utils/css-helpers";
import { ShinyUiComponent } from "../componentTypes";

export type ShinyPlotOutputProps = Partial<{
  name: string;
  width: string;
  height: string;
}>;

const ShinyPlotOutput: ShinyUiComponent<ShinyPlotOutputProps> = ({
  name = "shiny-plot-output",
  width = "100%",
  height = "100%",
}: ShinyPlotOutputProps) => {
  return (
    <PlotHolder
      style={{ height, width }}
      className={"shiny-plotOutput"}
      aria-label={"shiny-plotOutput"}
    >
      <GoGraph
        size={`calc(min(${width}, ${height})/2)`}
        style={{
          gridArea: "1/1",
          placeSelf: "center",
        }}
      />

      <div style={{ gridArea: "1/1", placeSelf: "end" }}>
        This is a plot with the name {name}!
      </div>
    </PlotHolder>
  );
};

const PlotHolder = styled.div({
  outline: "1px solid var(--rstudio-grey)",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  placeContent: "center",
  padding: "1rem",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});

export default ShinyPlotOutput;
