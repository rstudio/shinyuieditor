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
  const holderRef = React.useRef<HTMLDivElement>(null);

  // Start tiny so icon isn't the reason the container is big
  const [graphSize, setGraphSize] = React.useState(2);
  React.useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      if (!holderRef.current) return;

      const { offsetHeight, offsetWidth } = holderRef.current;
      setGraphSize(Math.min(offsetHeight, offsetWidth) * 0.9);
    });

    if (holderRef.current) ro.observe(holderRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <PlotHolder
      ref={holderRef}
      style={{ height, width }}
      className={"shiny-plotOutput"}
      aria-label={"shiny-plotOutput"}
    >
      <GoGraph
        // Account for padding of 1 rem
        size={`calc(${graphSize}px - 2rem)`}
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
  maxHeight: "100%",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});

export default ShinyPlotOutput;
