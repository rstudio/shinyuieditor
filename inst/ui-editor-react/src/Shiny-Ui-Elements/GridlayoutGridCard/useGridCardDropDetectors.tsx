import React from "react";

import { getIsValidMove } from "components/UiNode/TreeManipulation/placeNode";
import type { DraggedNodeInfo } from "DragAndDropHelpers/DragAndDropHelpers";
import { useFilteredDrop } from "DragAndDropHelpers/useFilteredDrop";
import { makeChildPath } from "Shiny-Ui-Elements/nodePathUtils";
import type { NodePath, ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";
import { usePlaceNode } from "state/uiTree";

export function useGridCardDropDetectors({
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

      console.log(
        "Place node at",
        makeChildPath(parentPath, positionInChildren)
      );

      place_node({
        node: nodeToPlace,
        currentPath,
        path: makeChildPath(parentPath, positionInChildren),
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
