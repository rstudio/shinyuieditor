import React from "react";

import type {
  ShinyUiNames,
  UiContainerNodeComponent,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import UiNode from "components/UiNode";
import { useDropHandlers } from "DragAndDropHelpers/useDropHandlers";

import { useGridItemSwapping } from "../GridlayoutGridCard/useGridItemSwapping";
import { EmptyGridPanelMessage } from "../GridLayoutPanelHelpers/EmptyPanelMessage";

import type { GridPanelSettings, Alignments } from "./index";

import classes from "./styles.module.css";

const rejectedNodes: ShinyUiNames[] = [
  "gridlayout::grid_page",
  "gridlayout::grid_card",
];
const GridlayoutGridPanel: UiContainerNodeComponent<GridPanelSettings> = ({
  uiChildren,
  uiArguments: { area, v_align, h_align, title },
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
      }}
      onClick={(e) => {
        if (eventHandlers.onClick) {
          console.log("Clicked a grid_panel()");

          eventHandlers.onClick?.(e);
        }
      }}
    >
      {title ? <h2 className={classes.panel_title}>{title}</h2> : null}
      <div
        className={classes.panel_content}
        style={{
          justifyItems: alignmentToCSSVal(h_align),
          alignItems: alignmentToCSSVal(v_align),
        }}
      >
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

const alignmentToCSSVal = (val?: Alignments) => {
  if (!val) return "center";
  if (val === "spread") return "space-evenly";

  return val;
};
