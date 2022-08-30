import React from "react";

import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";
import DropDetector from "Shiny-Ui-Elements/utils/DropDetector";

export function TabDropDetector({
  index,
  parentPath,
}: {
  index: number;
  parentPath: NodePath;
}) {
  return (
    <DropDetector
      dropArgs={{
        parentPath,
        onDrop: "add-node",
        positionInChildren: index,
      }}
      style={{
        width: "10px",
        height: "100%",
        order: index - 1,
      }}
    />
  );
}
