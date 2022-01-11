import styled from "@emotion/styled";
import { ShinyUiComponent } from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { GoGraph } from "react-icons/go";
import { makeBoxShadow } from "utils/css-helpers";

export type ShinyPlotOutputProps = Partial<{
  outputId: string;
  width: string;
  height: string;
}>;

const ShinyPlotOutput: ShinyUiComponent<ShinyPlotOutputProps> = ({
  outputId = "shiny-plot-output",
  width = "100%",
  height = "100%",
}: ShinyPlotOutputProps) => {
  const holderRef = React.useRef<HTMLDivElement>(null);

  // Start tiny so icon isn't the reason the container is big
  const [graphSize, setGraphSize] = React.useState(2);
  React.useEffect(() => {
    // Use conditionals here because in tests we dont have access to the
    // ResizeObserver variable
    if (typeof ResizeObserver === "undefined") return;
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
      className={"shiny-shiny::plotOutput"}
      aria-label={"shiny-shiny::plotOutput"}
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
        This is a plot with the name {outputId}!
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
