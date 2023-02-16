import React from "react";

import { isValidGridItem } from "../../components/Grids/isValidGridItem";
import { useSetLayout } from "../../components/Grids/useSetLayout";
import { nodesAreSiblings } from "../../components/UiNode/TreeManipulation/nodesAreSiblings";
import type { DraggedNodeInfo } from "../../DragAndDropHelpers/DragAndDropHelpers";
import { useFilteredDrop } from "../../DragAndDropHelpers/useFilteredDrop";
import type { NodePath } from "../uiNodeTypes";

import classes from "./styles.module.css";

export function useGridItemSwapping({
  path,
  area,
}: {
  path: NodePath;
  area: string;
}) {
  const setLayout = useSetLayout();

  const getIsValidSwap: (dragInfo: DraggedNodeInfo) => boolean =
    React.useCallback(
      ({ node, currentPath }: DraggedNodeInfo) => {
        if (currentPath === undefined) return false;

        if (!isValidGridItem(node)) return false;

        return nodesAreSiblings(currentPath, path);
      },
      [path]
    );

  const onDrop = React.useCallback(
    (dropInfo: DraggedNodeInfo) => {
      if (!("area" in dropInfo.node.uiArguments)) {
        // eslint-disable-next-line no-console
        console.error("Invalid grid area swap drop", { dropInfo });
        return;
      }

      // If for some reason area isn't available in the ui arguments of the
      // dropped node (which is should be because we don't allow drops unless
      // it's a grid panel), then let the swap_nodes() function detect that and
      // error for us.
      const droppedArea = dropInfo.node.uiArguments.area ?? "__BAD_DROP__";

      setLayout?.({ type: "SWAP_ITEMS", item_a: area, item_b: droppedArea });
    },
    [area, setLayout]
  );

  return useFilteredDrop({
    getCanAcceptDrop: getIsValidSwap,
    onDrop,
    canAcceptDropClass: classes.availableToSwap,
    hoveringOverClass: classes.hoveringOverSwap,
  });
}
