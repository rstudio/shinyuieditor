import React from "react";

import { wrapNodeInTabPanel } from "Shiny-Ui-Elements/ShinyNavbarPage/ShinyNavbarPage";
import { invalidTabPanelContents } from "Shiny-Ui-Elements/ShinyTabPanel/ShinyTabPanel";
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
}: {
  index: number;
  parentPath: NodePath;
  children?: React.ReactElement;
}) {
  return (
    <DropDetector
      className={
        classes.tabDropDetector + " " + (children ? classes.hasButton : "")
      }
      aria-label="tab drop detector"
      dropArgs={{
        parentPath,
        onDrop: "add-node",
        positionInChildren: index,
        processDropped: wrapNodeInTabPanel,
        dropFilters,
      }}
      style={{
        order: index - 1,
      }}
    >
      {children}
    </DropDetector>
  );
}
