import React from "react";

import UiNode from "../../components/UiNode/UiNode";
import { DropWatcherPanel } from "../../DragAndDropHelpers/DropWatcherPanel";
import { makeChildPath } from "../nodePathUtils";
import type { NodePath, ShinyUiChildren } from "../uiNodeTypes";

import styles from "./styles.module.css";

export function ChildrenWithDropNodes({
  dropPanelClass = styles.drop_watcher,
  uiChildren = [],
  path,
  showOnEmpty,
}: {
  dropPanelClass?: string | ((index: number) => string);
  uiChildren?: ShinyUiChildren;
  path: NodePath;
  showOnEmpty?: React.ReactNode;
}) {
  return (
    <>
      <DropWatcherPanel className={dropPanelClass} index={0} parentPath={path}>
        {uiChildren.length === 0 ? showOnEmpty : null}
      </DropWatcherPanel>
      {uiChildren.map((childNode, i) => (
        <React.Fragment key={path.join(".") + i}>
          <UiNode path={makeChildPath(path, i)} node={childNode} />
          <DropWatcherPanel
            className={dropPanelClass}
            index={i + 1}
            parentPath={path}
          />
        </React.Fragment>
      ))}
    </>
  );
}
