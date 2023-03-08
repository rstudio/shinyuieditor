import React from "react";

import UiNode from "../../../components/UiNode/UiNode";
import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import { makeChildPath } from "../../nodePathUtils";
import type {
  NodePath,
  ShinyUiChildren,
  ShinyUiNames,
} from "../../uiNodeTypes";

import styles from "./CardUtils.module.css";

export function CardChildrenWithDropNodes({
  parentUiName,
  uiChildren = [],
  path,
  dropPanelClass = styles.drop_watcher,
  showOnEmpty,
}: {
  parentUiName: ShinyUiNames;
  // parent: ShinyUiNode;
  dropPanelClass?: string | ((index: number) => string);
  uiChildren?: ShinyUiChildren;
  path: NodePath;
  showOnEmpty?: React.ReactNode;
}) {
  return (
    <>
      <DropWatcherPanel
        className={dropPanelClass}
        index={0}
        parentPath={path}
        parentNodeType={parentUiName}
      >
        {uiChildren.length === 0 ? showOnEmpty : null}
      </DropWatcherPanel>
      {uiChildren.map((childNode, i) => (
        <React.Fragment key={path.join(".") + i}>
          <UiNode path={makeChildPath(path, i)} node={childNode} />
          <DropWatcherPanel
            className={dropPanelClass}
            index={i + 1}
            parentPath={path}
            parentNodeType={parentUiName}
          />
        </React.Fragment>
      ))}
    </>
  );
}
