import React from "react";

import type {
  ShinyUiNames,
  UiContainerNodeComponent,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import UiNode from "components/UiNode";
import { useDropHandlers } from "DragAndDropHelpers/useDropHandlers";

import { EmptyGridPanelMessage } from "../GridLayoutPanelHelpers/EmptyPanelMessage";
import { useGridItemSwapping } from "../GridlayoutVerticalStackPanel/useGridItemSwapping";

import type {
  GridPanelSettings,
  HorizontalAlignments,
  VerticalAlignments,
} from "./index";

import classes from "./styles.module.css";

const rejectedNodes: ShinyUiNames[] = [
  "gridlayout::grid_page",
  "gridlayout::grid_panel",
  "gridlayout::grid_panel_stack",
];
const GridlayoutGridPanel: UiContainerNodeComponent<GridPanelSettings> = ({
  uiChildren,
  uiArguments: { area, verticalAlign, horizontalAlign, title },
  nodeInfo: { path },
  children,
  eventHandlers,
  compRef,
}) => {
  const dropListenerDivRef = React.useRef(null);
  const has_children = uiChildren.length > 0;

  useGridItemSwapping({ containerRef: compRef, area, path });
  useDropHandlers(dropListenerDivRef, {
    onDrop: "add-node",
    parentPath: path,
    positionInChildren: 0,
    dropFilters: { rejectedNodes },
  });

  return (
    <div
      ref={compRef}
      className={classes.grid_panel}
      style={{
        gridArea: area,
        justifyContent: dirToFlexProp[horizontalAlign ?? "spread"],
        alignContent: dirToFlexProp[verticalAlign ?? "spread"],
      }}
      onClick={(e) => {
        if (eventHandlers.onClick) {
          console.log("Clicked a grid_panel()");

          eventHandlers.onClick?.(e);
        }
      }}
    >
      {title ? <h2 className={classes.panel_title}>{title}</h2> : null}
      <div className={classes.panel_content}>
        {has_children ? (
          uiChildren.map((childNode, i) => (
            <UiNode
              key={path.join(".") + i}
              path={[...path, i]}
              canMove={false}
              {...childNode}
            />
          ))
        ) : (
          <div ref={dropListenerDivRef} className={classes.dropListener}>
            <EmptyGridPanelMessage path={path} />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default GridlayoutGridPanel;

const dirToFlexProp: Record<HorizontalAlignments | VerticalAlignments, string> =
  {
    center: "center",
    left: "start",
    top: "start",
    right: "end",
    bottom: "end",
    spread: "space-evenly",
  };
