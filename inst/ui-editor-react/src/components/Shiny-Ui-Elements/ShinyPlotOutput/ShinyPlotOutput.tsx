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
  const [graphSize, setGraphSize] = React.useState(2);
  React.useEffect(() => {
    // Use conditionals here because in tests we dont have access to the
    // ResizeObserver variable
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      if (!compRef.current) return;

      const { offsetHeight, offsetWidth } = compRef.current;
      setGraphSize(Math.min(offsetHeight, offsetWidth));
    });

    if (compRef.current) ro.observe(compRef.current);
    return () => ro.disconnect();
  }, [compRef]);

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
      {/* <code className={classes.label}>output${outputId}</code> */}
      <GoGraph
        // Account for padding of 30px + label height of 30px
        size={`calc(${graphSize}px - 60px)`}
      />

      {children}
    </div>
  );
};
export default ShinyPlotOutput;
