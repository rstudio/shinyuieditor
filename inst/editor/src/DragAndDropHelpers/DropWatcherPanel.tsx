import React from "react";

import type { NodePath } from "../Shiny-Ui-Elements/uiNodeTypes";

import type { DropHandlerArguments } from "./useFilteredDrop";
import { useFilteredDrop } from "./useFilteredDrop";

export function DropWatcherPanel({
  index,
  numChildren,
  parentPath,
  dropHandlerArgs = {},
  ...divProps
}: React.ComponentPropsWithoutRef<"div"> & {
  index: number;
  numChildren: number;
  parentPath: NodePath;
  dropHandlerArgs?: Partial<DropHandlerArguments>;
}) {
  const ref = useFilteredDrop({
    onDrop: (nodeInfo) => {
      console.log("Add this node as my child, please!", nodeInfo);
    },
    ...dropHandlerArgs,
  });

  return <div ref={ref} {...divProps} />;
}
