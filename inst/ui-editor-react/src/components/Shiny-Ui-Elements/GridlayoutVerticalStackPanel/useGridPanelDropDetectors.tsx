import React from "react";

import type {
  NodePath,
  ShinyUiNames,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import type { DraggedNodeInfo } from "DragAndDropHelpers/DragAndDropHelpers";
import { useDropHandlers } from "DragAndDropHelpers/useDropHandlers";
import { useDispatch } from "react-redux";
import { PLACE_NODE } from "state/uiTree";

const unacceptedNodes: ShinyUiNames[] = [
  "gridlayout::grid_page",
  "gridlayout::grid_panel_text",
  "gridlayout::grid_panel_stack",
];

export function useGridPanelDropDetectors({
  watcherRef,
  index,
  parentPath,
}: {
  watcherRef: React.RefObject<HTMLDivElement>;
  index: number;
  parentPath: NodePath;
}) {
  const dispatch = useDispatch();

  const canAcceptDrop = React.useCallback(
    (node: ShinyUiNode) => getInfoOfDropped(node) !== null,
    []
  );
  const handleDrop = React.useCallback(
    ({ node, currentPath }: DraggedNodeInfo) => {
      const nodeToPlace = getInfoOfDropped(node);
      if (!nodeToPlace) {
        throw new Error("No node to place...");
      }

      dispatch(
        PLACE_NODE({
          node: nodeToPlace,
          currentPath,
          parentPath,
          positionInChildren: index,
        })
      );
    },
    [dispatch, index, parentPath]
  );

  useDropHandlers(watcherRef, {
    onDrop: handleDrop,
    parentPath,
    positionInChildren: index,
    dropFilters: { getCanAcceptDrop: canAcceptDrop },
  });
}

// Special function that peels away grid_panels to see if their contents can be
// dumped into the current grid_panel
function getInfoOfDropped(node: ShinyUiNode): ShinyUiNode | null {
  if (unacceptedNodes.includes(node.uiName)) {
    return null;
  }
  const isGridPanel = node.uiName === "gridlayout::grid_panel";
  const nodeToPlace = isGridPanel ? node.uiChildren?.[0] : node;

  if (!nodeToPlace) {
    return null;
  }

  return nodeToPlace;
}
