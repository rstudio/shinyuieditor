import React from "react";

import type {
  NodePath,
  ShinyUiNames,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { useDispatch } from "react-redux";
import { PLACE_NODE } from "state/uiTree";

import { getIsValidMove } from "../components/UiNode/TreeManipulation/placeNode";

import type { DraggedNodeInfo } from "./DragAndDropHelpers";
import { useFilteredDrop } from "./useFilteredDrop";

type DropHandlerArguments = {
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
  const dispatch = useDispatch();

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
        dispatch(
          PLACE_NODE({
            ...dragInfo,
            parentPath,
            positionInChildren,
          })
        );
      } else {
        onDrop(dragInfo);
      }
    },
    [dispatch, onDrop, parentPath, positionInChildren]
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
