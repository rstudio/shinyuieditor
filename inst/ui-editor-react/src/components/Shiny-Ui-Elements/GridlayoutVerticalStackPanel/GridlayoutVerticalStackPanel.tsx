import React from "react";

import type {
  NodePath,
  UiContainerNodeComponent,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import UiNode from "components/UiNode";
import type { DraggedNodeInfo } from "DragAndDropHelpers/DragAndDropHelpers";
import { useDropHandlers } from "DragAndDropHelpers/useDropHandlers";
import { useDispatch } from "react-redux";
import { PLACE_NODE } from "state/uiTree";

import type { VerticalStackPanelSettings } from "./index";

import classes from "./styles.module.css";

const GridlayoutVerticalStackPanel: UiContainerNodeComponent<
  VerticalStackPanelSettings
> = ({
  uiArguments,
  uiChildren,
  nodeInfo,
  children,
  eventHandlers,
  compRef,
}) => {
  const { path } = nodeInfo;
  const { area, item_alignment, item_gap, title } = uiArguments;

  return (
    <div
      className={classes.container + " " + (title ? classes.withTitle : "")}
      ref={compRef}
      style={
        {
          gridArea: area,
          "--item-gap": item_gap,
        } as React.CSSProperties
      }
      onClick={eventHandlers.onClick}
    >
      {title ? <h2 className={classes.panelTitle}>{title}</h2> : null}
      <div
        className={classes.contentHolder}
        data-alignment={item_alignment ?? "top"}
      >
        <DropWatcherPanel
          index={0}
          parentPath={path}
          numChildren={uiChildren.length}
        />
        {uiChildren?.map((childNode, i) => (
          <React.Fragment key={path.join(".") + i}>
            <UiNode path={[...path, i]} {...childNode} />
            <DropWatcherPanel
              index={i + 1}
              numChildren={uiChildren.length}
              parentPath={path}
            />
          </React.Fragment>
        ))}
      </div>
      {children}
    </div>
  );
};

function DropWatcherPanel({
  index,
  numChildren,
  parentPath,
}: {
  index: number;
  numChildren: number;
  parentPath: NodePath;
}) {
  const dispatch = useDispatch();

  const watcherRef = React.useRef<HTMLDivElement>(null);

  const handleDrop = React.useCallback(
    ({ node, currentPath }: DraggedNodeInfo) => {
      const isGridPanel = node.uiName === "gridlayout::grid_panel";
      const nodeToPlace = isGridPanel ? node.uiChildren?.[0] : node;
      // const currentPath
      if (!nodeToPlace) {
        throw new Error("No node to place...");
      }

      dispatch(
        PLACE_NODE({
          node: nodeToPlace,
          currentPath,
          parentPath,
          positionInChildren: index,
        })
      );
    },
    [dispatch, index, parentPath]
  );

  useDropHandlers(watcherRef, {
    onDrop: handleDrop,
    parentPath,
    positionInChildren: index,
    dropFilters: {
      rejectedNodes: [
        "gridlayout::grid_page",
        // "gridlayout::grid_panel",
        "gridlayout::grid_panel_text",
        "gridlayout::grid_panel_stack",
      ],
    },
  });

  const position_class = dropWatcherPositionClass(index, numChildren);

  return (
    <div
      ref={watcherRef}
      className={classes.dropWatcher + " " + position_class}
    />
  );
}

// Assign special classes to the drop watcher divs to note their positions
function dropWatcherPositionClass(i: number, numChildren: number) {
  if (i === 0 && numChildren === 0) {
    return classes.onlyDropWatcher;
  }

  if (i === 0) {
    return classes.firstDropWatcher;
  }

  if (i === numChildren) {
    return classes.lastDropWatcher;
  }

  return classes.middleDropWatcher;
}

export default GridlayoutVerticalStackPanel;
