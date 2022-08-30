import React from "react";

import { wrapNodeInTabPanel } from "Shiny-Ui-Elements/ShinyNavbarPage/ShinyNavbarPage";
import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";
import DropDetector from "Shiny-Ui-Elements/utils/DropDetector";

export function TabDropDetector({
  index,
  parentPath,
  width,
  children,
}: {
  index: number;
  parentPath: NodePath;
  width: string;
  children?: React.ReactElement;
}) {
  return (
    <DropDetector
      aria-label="tab drop detector"
      dropArgs={{
        parentPath,
        onDrop: "add-node",
        positionInChildren: index,
        processDropped: wrapNodeInTabPanel,
      }}
      style={{
        width,
        height: "100%",
        position: "relative",
        order: index - 1,
      }}
    >
      {children}
    </DropDetector>
  );
}
