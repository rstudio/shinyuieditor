import React from "react";

import { nodesAreSiblings } from "components/UiNode/TreeManipulation/nodesAreSiblings";
import type { DraggedNodeInfo } from "DragAndDropHelpers/DragAndDropHelpers";
import { useFilteredDrop } from "DragAndDropHelpers/useFilteredDrop";
import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";

import { useSetLayout } from "../../components/Grids/useSetLayout";
import { gridAwareNodes } from "../GridLayoutPanelHelpers/EmptyPanelMessage/gridAwareNodes";

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
  const setLayout = useSetLayout();

  const getIsValidSwap: (dragInfo: DraggedNodeInfo) => boolean =
    React.useCallback(
      ({ node, currentPath }: DraggedNodeInfo) => {
        if (currentPath === undefined) return false;

        if (!gridAwareNodes.includes(node.uiName)) return false;

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

  useFilteredDrop({
    watcherRef: containerRef,
    getCanAcceptDrop: getIsValidSwap,
    onDrop,
    canAcceptDropClass: classes.availableToSwap,
    hoveringOverClass: classes.hoveringOverSwap,
  });
}
