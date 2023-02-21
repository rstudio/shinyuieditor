import React from "react";

import type { Wrapping_Node } from "../components/UiNode/TreeManipulation/wrapInNode";
import { makeChildPath } from "../Shiny-Ui-Elements/nodePathUtils";
import type { NodePath, ShinyUiNames } from "../Shiny-Ui-Elements/uiNodeTypes";
import { usePlaceNode } from "../state/usePlaceNode";

import type { DropHandlerArguments } from "./useFilteredDrop";
import { useFilteredDrop } from "./useFilteredDrop";

export function DropWatcherPanel({
  index,
  parentPath,
  dropHandlerArgs,
  className = "",
  wrappingNode,
  dropFilters,
  ...divProps
}: Omit<React.ComponentPropsWithoutRef<"div">, "className"> & {
  index: number;
  parentPath: NodePath;
  wrappingNode?: Wrapping_Node;
  dropFilters?: { rejected: ShinyUiNames[] } | { accepted: ShinyUiNames[] };
  dropHandlerArgs?: Partial<DropHandlerArguments>;
  /** Classname can either be static string or can be a function that returns a
   * class name when passed the panels index */
  className?: string | ((index: number) => string);
}) {
  const place_node = usePlaceNode();

  const ref = useFilteredDrop({
    onDrop: (nodeInfo) => {
      place_node({
        ...nodeInfo,
        path: makeChildPath(parentPath, index),
        wrappingNode,
      });
    },
    getCanAcceptDrop: ({ node }) => {
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
