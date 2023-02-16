import React from "react";

import { makeChildPath } from "../Shiny-Ui-Elements/nodePathUtils";
import type { NodePath } from "../Shiny-Ui-Elements/uiNodeTypes";
import { usePlaceNode } from "../state/app_info";

import type { DropHandlerArguments } from "./useFilteredDrop";
import { useFilteredDrop } from "./useFilteredDrop";

export function DropWatcherPanel({
  index,
  parentPath,
  dropHandlerArgs,
  className = "",
  ...divProps
}: Omit<React.ComponentPropsWithoutRef<"div">, "className"> & {
  index: number;
  parentPath: NodePath;
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
      });
    },
    ...dropHandlerArgs,
  });

  const panelClass =
    typeof className === "string" ? className : className(index);
  return (
    <div ref={ref} className={panelClass} {...divProps} data-index={index} />
  );
}
