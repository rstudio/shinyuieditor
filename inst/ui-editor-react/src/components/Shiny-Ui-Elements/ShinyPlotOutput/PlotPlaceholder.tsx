import * as React from "react";

import { GoGraph } from "react-icons/go";

import { InputOutputTitle } from "../InputOutputTitle";

import type { ShinyPlotOutputProps } from "./index";

import { useContainerDimensions } from "./ShinyPlotOutput";
import classes from "./styles.module.css";

export function PlotPlaceholder({
  outputId,
  compRef,
}: ShinyPlotOutputProps & { compRef: React.RefObject<HTMLDivElement> }) {
  // Start tiny so icon isn't the reason the container is big
  const containerDimensions = useContainerDimensions(compRef);

  console.log({ containerDimensions });

  const smallestDim =
    containerDimensions === null
      ? 100
      : Math.min(containerDimensions.width, containerDimensions.height);

  return (
    <div
      className={classes.plotPlaceholder}
      // style={{ width: "100%", height: "100%" }}
      aria-label="shiny::plotOutput placeholder"
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
    </div>
  );
}
