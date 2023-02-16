import React from "react";

import { mergeClasses } from "../../utils/mergeClasses";
import type { NodePath } from "../uiNodeTypes";

import classes from "./styles.module.css";
import { useDropWatcherPanel } from "./useGridCardDropDetectors";

export function DropWatcherPanel({
  index,
  numChildren,
  parentPath,
}: {
  index: number;
  numChildren: number;
  parentPath: NodePath;
}) {
  const watcherRef = useDropWatcherPanel({
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
