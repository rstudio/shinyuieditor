import React from "react";

import type { NodePath } from "../Shiny-Ui-Elements/uiNodeTypes";

import type { DropHandlerArguments } from "./useFilteredDrop";
import { useFilteredDrop } from "./useFilteredDrop";

export function DropWatcherPanel({
  index,
  numChildren,
  parentPath,
  dropHandlerArgs = {},
  className,
  ...divProps
}: Omit<React.ComponentPropsWithoutRef<"div">, "className"> & {
  index: number;
  numChildren: number;
  parentPath: NodePath;
  dropHandlerArgs?: Partial<DropHandlerArguments>;
  /** Classname can either be static string or can be a function that returns a
   * class name when passed the panels index */
  className: string | ((index: number) => string);
}) {
  const ref = useFilteredDrop({
    onDrop: (nodeInfo) => {
      console.log("Add this node as my child, please!", nodeInfo);
    },
    ...dropHandlerArgs,
  });

  const panelClass =
    typeof className === "string" ? className : className(index);
  return (
    <div ref={ref} className={panelClass} {...divProps} data-index={index} />
  );
}
