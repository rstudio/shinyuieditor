import React from "react";

import { invalidTabPanelContents } from "Shiny-Ui-Elements/ShinyTabPanel/ShinyTabPanel";
import { wrapNodeInTabPanel } from "Shiny-Ui-Elements/ShinyTabPanel/tabPanelHelpers";
import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";
import DropDetector from "Shiny-Ui-Elements/utils/DropDetector";

import classes from "./Tabset.module.css";

const dropFilters = {
  rejectedNodes: invalidTabPanelContents.filter(
    (uiName) => uiName !== "shiny::tabPanel"
  ),
};

export function TabDropDetector({
  index,
  parentPath,
  children,
  baseWidth,
}: {
  baseWidth: string;
  index: number;
  parentPath: NodePath;
  children?: React.ReactElement;
}) {
  return (
    <DropDetector
      className={classes.tabDropDetector}
      aria-label="tab drop detector"
      dropArgs={{
        parentPath,
        onDrop: "add-node",
        positionInChildren: index,
        processDropped: wrapNodeInTabPanel,
        dropFilters,
      }}
      style={
        {
          "--baseWidth": baseWidth,
          order: index - 1,
        } as React.CSSProperties
      }
    >
      {children}
    </DropDetector>
  );
}
