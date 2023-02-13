import React from "react";

import { getIsValidMove } from "../components/UiNode/TreeManipulation/getIsValidMove";
import type { ShinyUiNode } from "../main";
import { makeChildPath } from "../Shiny-Ui-Elements/nodePathUtils";
import type { NodePath, ShinyUiNames } from "../Shiny-Ui-Elements/uiNodeTypes";
import { usePlaceNode } from "../state/app_info";

import type { DraggedNodeInfo } from "./DragAndDropHelpers";
import { useFilteredDrop } from "./useFilteredDrop";

export type DropHandlerArguments = {
  dropFilters?: DropFilters;
  parentPath: NodePath;
  positionInChildren: number;
  onDrop: "add-node" | ((droppedNode: DraggedNodeInfo) => void);
  /**
   * Function to run the dropped node through before sending to tree. Can be
   * used to do things like add a wrapper etc...
   */
  processDropped?: (node: ShinyUiNode) => ShinyUiNode;
};

export function useDropHandlers(
  watcherRef: React.RefObject<HTMLDivElement>,
  {
    dropFilters = { rejectedNodes: [] },
    positionInChildren,
    parentPath,
    onDrop,
    processDropped = (x) => x,
  }: DropHandlerArguments
) {
  const place_node = usePlaceNode();

  const getCanAcceptDrop: (dragInfo: DraggedNodeInfo) => boolean =
    React.useCallback(
      ({ node, currentPath }: DraggedNodeInfo) => {
        return (
          getAcceptsDraggedNode(dropFilters, node) &&
          getIsValidMove({
            fromPath: currentPath,
            toPath: [...parentPath, positionInChildren],
          })
        );
      },
      [dropFilters, parentPath, positionInChildren]
    );

  const handleDrop: (dragInfo: DraggedNodeInfo) => void = React.useCallback(
    (dragInfo: DraggedNodeInfo) => {
      if (onDrop === "add-node") {
        const { node, currentPath } = dragInfo;

        place_node({
          node: processDropped(node),
          currentPath,
          path: makeChildPath(parentPath, positionInChildren),
        });
      } else {
        onDrop(dragInfo);
      }
    },
    [onDrop, parentPath, place_node, positionInChildren, processDropped]
  );

  useFilteredDrop({
    watcherRef,
    getCanAcceptDrop,
    onDrop: handleDrop,
  });
}

type DropFilters =
  | {
      acceptedNodes: ShinyUiNames[];
    }
  | {
      rejectedNodes: ShinyUiNames[];
    }
  | {
      getCanAcceptDrop: (droppedNode: ShinyUiNode) => boolean;
    };

function getAcceptsDraggedNode(
  dropFilters: DropFilters,
  draggedNode?: ShinyUiNode
): boolean {
  if (draggedNode === undefined) {
    return false;
  }

  if ("getCanAcceptDrop" in dropFilters) {
    return dropFilters.getCanAcceptDrop(draggedNode);
  }

  if ("acceptedNodes" in dropFilters) {
    return dropFilters.acceptedNodes.includes(draggedNode.uiName);
  }

  if ("rejectedNodes" in dropFilters) {
    return !dropFilters.rejectedNodes.includes(draggedNode.uiName);
  }

  throw new Error(
    "Unexpected drop filter setup. Check accepted and rejected node types."
  );
}
