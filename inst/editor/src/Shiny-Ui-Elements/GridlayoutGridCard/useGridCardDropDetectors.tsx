import React from "react";

import { getIsValidMove } from "../../components/UiNode/TreeManipulation/getIsValidMove";
import type { DraggedNodeInfo } from "../../DragAndDropHelpers/DragAndDropHelpers";
import { useFilteredDrop } from "../../DragAndDropHelpers/useFilteredDrop";
import { usePlaceNode } from "../../state/app_info";
import { makeChildPath } from "../nodePathUtils";
import type { NodePath, ShinyUiNode } from "../uiNodeTypes";

export function useDropWatcherPanel({
  positionInChildren,
  parentPath,
}: {
  positionInChildren: number;
  parentPath: NodePath;
}) {
  const place_node = usePlaceNode();

  const getCanAcceptDrop: (dragInfo: DraggedNodeInfo) => boolean =
    React.useCallback(
      ({ node, currentPath }: DraggedNodeInfo) => {
        const hasNodeToAccept = getInfoOfDropped(node) !== null;

        return (
          hasNodeToAccept &&
          getIsValidMove({
            fromPath: currentPath,
            toPath: [...parentPath, positionInChildren],
          })
        );
      },
      [positionInChildren, parentPath]
    );

  const onDrop = React.useCallback(
    ({ node, currentPath }: DraggedNodeInfo) => {
      const nodeToPlace = getInfoOfDropped(node);
      if (!nodeToPlace) {
        throw new Error("No node to place...");
      }

      place_node({
        node: nodeToPlace,
        currentPath,
        path: makeChildPath(parentPath, positionInChildren),
      });
    },
    [positionInChildren, parentPath, place_node]
  );

  const watcherRef = useFilteredDrop({
    getCanAcceptDrop,
    onDrop,
  });

  return watcherRef;
}

// Special function that peels away grid_panels to see if their contents can be
// dumped into the current grid_panel
function getInfoOfDropped(node: ShinyUiNode): ShinyUiNode | null {
  // We can't place grid panels inside of other grid panels

  const node_type = node.uiName;

  // If it's a grid card with a single child, then then drag just looks like
  // moving that child
  if (node_type === "gridlayout::grid_card" && node.uiChildren?.length === 1) {
    return node.uiChildren[0];
  }

  if (node_type.includes("gridlayout::grid_card")) {
    return null;
  }

  // // Since plain grid panels have just a single element, we can just grab what's
  // // inside that element for placement
  // if (node.uiName === "gridlayout::grid_card" && node.uiChildren?.[0]) {
  //
  // }

  return node;
}
