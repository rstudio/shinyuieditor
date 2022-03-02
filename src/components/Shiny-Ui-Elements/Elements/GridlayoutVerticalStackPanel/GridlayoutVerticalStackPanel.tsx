import React from "react";

import { UiContainerNodeComponent } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import UiNode from "components/Shiny-Ui-Elements/UiNode";

import { AlignmentOptions, VerticalStackPanelSettings } from "./index";

import classes from "./styles.module.css";

const GridlayoutVerticalStackPanel: UiContainerNodeComponent<
  VerticalStackPanelSettings
> = ({ uiArguments, uiChildren, path, children, ...passthroughProps }) => {
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
      {uiChildren?.map((childNode, i) => (
        <UiNode key={path.join(".") + i} path={[...path, i]} {...childNode} />
      ))}
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
