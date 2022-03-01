import { UiNodeComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import React from "react";
import { AlignmentOptions, VerticalStackPanelSettings } from "./index";
import classes from "./styles.module.css";

const GridlayoutVerticalStackPanel: UiNodeComponent<
  VerticalStackPanelSettings
> = (props) => {
  console.log("Vertical Stack Panel", props);
  const { uiArguments, children, ...passthroughProps } = props;
  const { area, item_alignment, item_gap } = uiArguments;
  return (
    <div
      className={classes.container}
      style={
        {
          gridArea: area,
          justifyContent: dirToFlexProp[item_alignment ?? "top"],
          "--item-gap": item_gap,
        } as React.CSSProperties
      }
      {...passthroughProps}
    >
      {children}
    </div>
  );
};
export default GridlayoutVerticalStackPanel;
const dirToFlexProp: Record<
  AlignmentOptions,
  React.CSSProperties["justifyContent"]
> = {
  top: "flex-start",
  center: "center",
  bottom: "flex-end",
  spread: "space-evenly",
};
