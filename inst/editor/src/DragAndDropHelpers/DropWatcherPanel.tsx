import React from "react";

import { getIsValidMove } from "../components/UiNode/TreeManipulation/getIsValidMove";
import type { Wrapping_Node } from "../components/UiNode/TreeManipulation/wrapInNode";
import { getUiNodeInfo } from "../Shiny-Ui-Elements/getUiNodeInfo";
import { makeChildPath } from "../Shiny-Ui-Elements/nodePathUtils";
import type { NodePath, ShinyUiNames } from "../Shiny-Ui-Elements/uiNodeTypes";
import { usePlaceNode } from "../state/usePlaceNode";

import type { DropHandlerArguments } from "./useFilteredDrop";
import { useFilteredDrop } from "./useFilteredDrop";

export type DropWatcherPanelProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className"
> & {
  parentNodeType: ShinyUiNames;
  index: number;
  parentPath: NodePath;
  wrappingNode?: Wrapping_Node;
  dropFilters?: { rejected: ShinyUiNames[] } | { accepted: ShinyUiNames[] };
  dropHandlerArgs?: Partial<DropHandlerArguments>;
  /** Classname can either be static string or can be a function that returns a
   * class name when passed the panels index */
  className?: string | ((index: number) => string);
};

export function DropWatcherPanel({
  index,
  parentNodeType,
  parentPath,
  dropHandlerArgs,
  className = "",
  wrappingNode,
  dropFilters,
  ...divProps
}: DropWatcherPanelProps) {
  const place_node = usePlaceNode();

  const ref = useFilteredDrop({
    onDrop: (nodeInfo) => {
      place_node({
        ...nodeInfo,
        path: makeChildPath(parentPath, index),
        wrappingNode,
      });
    },
    getCanAcceptDrop: (nodeInfo) => {
      const { node, currentPath } = nodeInfo;

      // First check that this move makes sense navigationally. E.g. were not
      // trying to move a node into it's own children or something
      if (
        !getIsValidMove({
          fromPath: currentPath,
          toPath: [...parentPath, index],
        })
      ) {
        return false;
      }

      const draggedNodeInfo = getUiNodeInfo(node.uiName);
      if (
        "allowedParents" in draggedNodeInfo &&
        !draggedNodeInfo.allowedParents?.includes(parentNodeType)
      ) {
        return false;
      }

      if (!dropFilters) return true;

      if ("accepted" in dropFilters) {
        return node.uiName in dropFilters.accepted;
      } else {
        return !(node.uiName in dropFilters.rejected);
      }
    },
    ...dropHandlerArgs,
  });

  const panelClass =
    typeof className === "string" ? className : className(index);
  return (
    <div ref={ref} className={panelClass} {...divProps} data-index={index} />
  );
}
