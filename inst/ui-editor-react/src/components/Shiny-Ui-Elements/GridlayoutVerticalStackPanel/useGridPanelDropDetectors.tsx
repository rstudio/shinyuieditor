import React from "react";

import type {
  NodePath,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { getIsValidMove } from "components/UiNode/TreeManipulation/placeNode";
import type { DraggedNodeInfo } from "DragAndDropHelpers/DragAndDropHelpers";
import { useFilteredDrop } from "DragAndDropHelpers/useFilteredDrop";
import { usePlaceNode } from "state/uiTree";

export function useGridPanelDropDetectors({
  watcherRef,
  positionInChildren,
  parentPath,
}: {
  watcherRef: React.RefObject<HTMLDivElement>;
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
        parentPath,
        positionInChildren,
      });
    },
    [positionInChildren, parentPath, place_node]
  );

  useFilteredDrop({
    watcherRef,
    getCanAcceptDrop,
    onDrop,
  });
}

// Special function that peels away grid_panels to see if their contents can be
// dumped into the current grid_panel
function getInfoOfDropped(node: ShinyUiNode): ShinyUiNode | null {
  // We can't place grid panels inside of other grid panels
  if (node.uiName.includes("gridlayout::grid_panel_")) {
    return null;
  }

  // Since plain grid panels have just a single element, we can just grab what's
  // inside that element for placement
  if (node.uiName === "gridlayout::grid_panel" && node.uiChildren?.[0]) {
    return node.uiChildren[0];
  }

  return node;
}
