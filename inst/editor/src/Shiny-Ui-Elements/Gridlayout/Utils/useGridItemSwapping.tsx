import React from "react";

import { nodesAreSiblings } from "../../../components/UiNode/TreeManipulation/nodesAreSiblings";
import type { DraggedNodeInfo } from "../../../DragAndDropHelpers/DragAndDropHelpers";
import { useFilteredDrop } from "../../../DragAndDropHelpers/useFilteredDrop";
import { useCurrentDraggedNode } from "../../../state/currentlyDraggedNode";
import type { NodePath } from "../../uiNodeTypes";

import { isValidGridItem } from "./isValidGridItem";
import classes from "./swapping.module.css";
import { useSetLayout } from "./useSetLayout";

export function useGridItemSwapping({
  path,
  area,
}: {
  path: NodePath;
  area: string;
}) {
  const currentDrag = useCurrentDraggedNode();

  const setLayout = useSetLayout();

  const getIsValidSwap: (dragInfo: DraggedNodeInfo) => boolean =
    React.useCallback(
      ({ node, currentPath }: DraggedNodeInfo) => {
        if (currentPath === undefined) return false;

        if (!isValidGridItem(node)) return false;

        const valid = nodesAreSiblings(currentPath, path);

        return valid;
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

      setLayout?.({
        type: "SWAP_ITEMS",
        item_a: area,
        item_b: droppedArea as string,
      });
    },
    [area, setLayout]
  );

  const ref = useFilteredDrop({
    getCanAcceptDrop: getIsValidSwap,
    onDrop,
    canAcceptDropClass: classes.availableToSwap,
    hoveringOverClass: classes.hoveringOverSwap,
  });

  // The following effects add some data attributes to the grid node that are
  // used to populate a little message telling the user what grid items are
  // swapping
  React.useEffect(() => {
    if (ref.current) {
      ref.current.dataset["gridArea"] = area;
    }
  }, [area, ref]);

  React.useEffect(() => {
    if (
      ref.current &&
      currentDrag?.node &&
      "area" in currentDrag.node.uiArguments
    ) {
      ref.current.dataset["swapWith"] = currentDrag.node.uiArguments
        .area as string;
    }
  }, [currentDrag?.node, ref]);

  return ref;
}
