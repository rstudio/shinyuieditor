import React from "react";

import DeleteNodeButton from "../../components/DeleteNodeButton";
import {
  BsCard,
  BsCardHeader,
} from "../../components/Grids/GridLayoutPanelHelpers/GridCards";
import UiNode from "../../components/UiNode/UiNode";
import { mergeClasses } from "../../utils/mergeClasses";
import { makeChildPath } from "../nodePathUtils";
import type { NodePath, UiNodeComponent } from "../uiNodeTypes";

import type { GridCardSettings } from "./index";

import classes from "./styles.module.css";
import { useGridCardDropDetectors } from "./useGridCardDropDetectors";
import { useGridItemSwapping } from "./useGridItemSwapping";

const GridlayoutGridCard: UiNodeComponent<GridCardSettings> = ({
  uiArguments: { area, item_gap, title },
  uiChildren,
  path,
  wrapperProps,
}) => {
  const compRef = React.useRef<HTMLDivElement>(null);
  const numChildren = uiChildren?.length ?? 0;

  useGridItemSwapping({ containerRef: compRef, area, path });

  return (
    <BsCard
      className={mergeClasses(
        classes.container,
        title ? classes.withTitle : null
      )}
      ref={compRef}
      style={
        {
          gridArea: area,
          "--item-gap": item_gap,
        } as React.CSSProperties
      }
      {...wrapperProps}
    >
      {title ? (
        <BsCardHeader className={classes.panelTitle}>{title}</BsCardHeader>
      ) : null}
      <div className={classes.contentHolder} data-alignment="top">
        <DropWatcherPanel
          index={0}
          parentPath={path}
          numChildren={numChildren}
        />
        {numChildren > 0 ? (
          uiChildren?.map((childNode, i) => (
            <React.Fragment key={path.join(".") + i}>
              <UiNode path={makeChildPath(path, i)} node={childNode} />
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
    </BsCard>
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
      className={mergeClasses(classes.dropWatcher, position_class)}
      role="region"
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
      <DeleteNodeButton
        path={path}
        justIcon={true}
        label="Delete empty grid card"
      />
    </div>
  );
}

export default GridlayoutGridCard;
