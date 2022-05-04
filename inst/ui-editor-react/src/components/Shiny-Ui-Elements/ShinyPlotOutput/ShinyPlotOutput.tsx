import * as React from "react";

import type { UiNodeComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import type { ShinyPlotOutputProps } from "./index";

import { PlotPlaceholder } from "./PlotPlaceholder";
import classes from "./styles.module.css";

const ShinyPlotOutput: UiNodeComponent<ShinyPlotOutputProps> = ({
  uiArguments: { outputId, width = "300px", height = "200px" },
  children,
  eventHandlers,
  compRef,
}) => {
  return (
    <div
      className={classes.container}
      ref={compRef}
      style={{ height, width }}
      aria-label="shiny::plotOutput placeholder"
      {...eventHandlers}
    >
      <PlotPlaceholder outputId={outputId} compRef={compRef} />
      {children}
    </div>
  );
};

export function useContainerDimensions(
  containerRef: React.RefObject<HTMLElement>
) {
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
