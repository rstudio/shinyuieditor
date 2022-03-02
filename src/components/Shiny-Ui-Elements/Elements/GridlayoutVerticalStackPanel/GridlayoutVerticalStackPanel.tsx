import React from "react";

import { UiContainerNodeComponent } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import UiNode from "components/Shiny-Ui-Elements/UiNode";

import { VerticalStackPanelSettings } from "./index";

import classes from "./styles.module.css";

const GridlayoutVerticalStackPanel: UiContainerNodeComponent<
  VerticalStackPanelSettings
> = ({ uiArguments, uiChildren, path, children, ...passthroughProps }) => {
  const { area, item_alignment, item_gap } = uiArguments;

  // Assign special classes to the drop watcher divs to note their positions
  const dropWatcherPositionClass = (i: number) => {
    if (i === -1) {
      return classes.firstDropWatcher;
    }

    if (i === uiChildren.length - 1) {
      return classes.lastDropWatcher;
    }

    return classes.middleDropWatcher;
  };

  return (
    <div
      className={classes.container}
      data-alignment={item_alignment ?? "top"}
      style={
        {
          gridArea: area,
          "--item-gap": item_gap,
        } as React.CSSProperties
      }
      {...passthroughProps}
    >
      <div
        className={classes.dropWatcher + " " + dropWatcherPositionClass(-1)}
      ></div>
      {uiChildren?.map((childNode, i) => (
        <React.Fragment key={path.join(".") + i}>
          <UiNode path={[...path, i]} {...childNode} />
          <div
            className={classes.dropWatcher + " " + dropWatcherPositionClass(i)}
          />
        </React.Fragment>
      ))}
      {children}
    </div>
  );
};
export default GridlayoutVerticalStackPanel;
