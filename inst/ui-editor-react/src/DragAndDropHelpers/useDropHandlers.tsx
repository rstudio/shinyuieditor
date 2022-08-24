import React from "react";

import type {
  NodePath,
  ShinyUiNames,
  ShinyUiNode,
} from "Shiny-Ui-Elements/uiNodeTypes";
import { usePlaceNode } from "state/uiTree";

import { getIsValidMove } from "../components/UiNode/TreeManipulation/placeNode";

import type { DraggedNodeInfo } from "./DragAndDropHelpers";
import { useFilteredDrop } from "./useFilteredDrop";

export type DropHandlerArguments = {
  dropFilters?: DropFilters;
  parentPath: NodePath;
  positionInChildren?: number;
  onDrop: "add-node" | ((droppedNode: DraggedNodeInfo) => void);
};

export function useDropHandlers(
  watcherRef: React.RefObject<HTMLDivElement>,
  {
    dropFilters = { rejectedNodes: [] },
    positionInChildren = Infinity,
    parentPath,
    onDrop,
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
        place_node({
          ...dragInfo,
          parentPath,
          positionInChildren,
        });
      } else {
        onDrop(dragInfo);
      }
    },
    [onDrop, parentPath, place_node, positionInChildren]
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
