import React from "react";

import DeleteNodeButton from "components/DeleteNodeButton";
import type {
  NodePath,
  UiContainerNodeComponent,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import UiNode from "components/UiNode";

import type { GridCardSettings } from "./index";

import classes from "./styles.module.css";
import { useGridCardDropDetectors } from "./useGridCardDropDetectors";
import { useGridItemSwapping } from "./useGridItemSwapping";

const GridlayoutGridCard: UiContainerNodeComponent<GridCardSettings> = ({
  uiArguments: { area, item_gap, title },
  uiChildren,
  nodeInfo: { path },
  children,
  eventHandlers,
  compRef,
}) => {
  const has_children = uiChildren.length > 0;

  useGridItemSwapping({ containerRef: compRef, area, path });

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
      <div className={classes.contentHolder} data-alignment="top">
        <DropWatcherPanel
          index={0}
          parentPath={path}
          numChildren={uiChildren.length}
        />
        {has_children ? (
          uiChildren?.map((childNode, i) => (
            <React.Fragment key={path.join(".") + i}>
              <UiNode path={[...path, i]} {...childNode} />
              <DropWatcherPanel
                index={i + 1}
                numChildren={uiChildren.length}
                parentPath={path}
              />
            </React.Fragment>
          ))
        ) : (
          <EmptyGridCardMessage path={path} />
        )}
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
  const watcherRef = React.useRef<HTMLDivElement>(null);
  useGridCardDropDetectors({
    watcherRef,
    positionInChildren: index,
    parentPath,
  });

  const position_class = dropWatcherPositionClass(index, numChildren);

  return (
    <div
      ref={watcherRef}
      className={classes.dropWatcher + " " + position_class}
      aria-label="drop watcher"
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

function EmptyGridCardMessage({ path }: { path: NodePath }) {
  return (
    <div className={classes.emptyGridCard}>
      <span className={classes.emptyMessage}>Empty grid card</span>
      <DeleteNodeButton path={path} justIcon={true} />
    </div>
  );
}

export default GridlayoutGridCard;
