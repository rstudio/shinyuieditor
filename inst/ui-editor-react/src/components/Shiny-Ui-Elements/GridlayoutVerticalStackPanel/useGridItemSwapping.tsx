import React from "react";

import type { NodePath } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { nodesAreSiblings } from "components/UiNode/TreeManipulation/placeNode";
import type { DraggedNodeInfo } from "DragAndDropHelpers/DragAndDropHelpers";
import { useFilteredDrop } from "DragAndDropHelpers/useFilteredDrop";

import classes from "./styles.module.css";
export function useGridItemSwapping({
  containerRef,
  path,
  area,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  path: NodePath;
  area: string;
}) {
  const getIsValidSwap: (dragInfo: DraggedNodeInfo) => boolean =
    React.useCallback(
      ({ node, currentPath }: DraggedNodeInfo) => {
        if (currentPath === undefined) return false;

        if (node.uiName !== "gridlayout::grid_panel") return false;

        return nodesAreSiblings(currentPath, path);
      },
      [path]
    );

  useFilteredDrop({
    watcherRef: containerRef,
    getCanAcceptDrop: getIsValidSwap,
    onDrop: (dropInfo) => {
      console.log(`Swapped panel in grid area: ${area} with `, dropInfo.node);
    },
    canAcceptDropClass: classes.availableToSwap,
    hoveringOverClass: classes.hoveringOverSwap,
  });
}
