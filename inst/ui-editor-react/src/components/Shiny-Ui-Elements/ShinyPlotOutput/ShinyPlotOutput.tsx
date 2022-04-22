import * as React from "react";

import type { UiNodeComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { GoGraph } from "react-icons/go";

import { InputOutputTitle } from "../InputOutputTitle";

import type { ShinyPlotOutputProps } from "./index";

import classes from "./styles.module.css";

const ShinyPlotOutput: UiNodeComponent<ShinyPlotOutputProps> = ({
  uiArguments,
  children,
  eventHandlers,
  compRef,
}) => {
  const {
    outputId = "shiny-plot-output",
    width = "300px",
    height = "200px",
  } = uiArguments;

  // Start tiny so icon isn't the reason the container is big
  const containerDimensions = useContainerDimensions(compRef);

  const smallestDim =
    containerDimensions === null
      ? 100
      : Math.min(containerDimensions.width, containerDimensions.height);

  return (
    <div
      className={classes.container}
      ref={compRef}
      style={{ height, width }}
      aria-label="shiny::plotOutput placeholder"
      {...eventHandlers}
    >
      <InputOutputTitle
        className={classes.label}
        type="output"
        name={outputId}
      />
      <GoGraph
        // Account for padding of 30px + label height of 30px
        size={`calc(${smallestDim}px - 60px)`}
      />

      {children}
    </div>
  );
};

function useContainerDimensions(containerRef: React.RefObject<HTMLElement>) {
  const [dimensions, setDimensions] = React.useState<{
    width: number;
    height: number;
  } | null>(null);
  React.useEffect(() => {
    // Use conditionals here because in tests we dont have access to the
    // ResizeObserver variable
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      if (!containerRef.current) return;

      const { offsetHeight, offsetWidth } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    });

    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [containerRef]);

  return dimensions;
}

export default ShinyPlotOutput;
