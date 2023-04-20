import * as React from "react";

import { GoGraph } from "react-icons/go";

import { InputOutputTitle } from "../utils/InputOutputTitle";

import type { ShinyPlotOutputProps } from "./index";

import classes from "./styles.module.css";

export function StaticPlotPlaceholder({ outputId }: ShinyPlotOutputProps) {
  const plotHolderRef = React.useRef<HTMLDivElement>(null);
  // Start tiny so icon isn't the reason the container is big
  const containerDimensions = useContainerDimensions(plotHolderRef);

  const smallestDim =
    containerDimensions === null
      ? 100
      : Math.min(containerDimensions.width, containerDimensions.height);

  return (
    <div
      ref={plotHolderRef}
      className={classes.plotPlaceholder}
      aria-label="shiny::plotOutput placeholder"
    >
      <InputOutputTitle
        className={classes.label}
        type="output"
        name={outputId}
      />
      <GoGraph
        // Account for padding of 30px + label height of 30px
        size={`calc(${smallestDim}px - 80px)`}
      />
    </div>
  );
}

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
