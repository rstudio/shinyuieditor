import React from "react";

import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import { invalidTabPanelContents } from "../../../Shiny-Ui-Elements/ShinyTabPanel";
import type { NodePath } from "../../../ui-node-definitions/NodePath";
import type { ShinyUiNode } from "../../../ui-node-definitions/ShinyUiNode";

import classes from "./Tabset.module.css";

const dropFilters = {
  rejected: invalidTabPanelContents.filter((id) => id !== "tabPanel"),
};

const wrap_in_tab_panel = ({ id }: ShinyUiNode) => {
  return id !== "tabPanel"
    ? ({
        id: "tabPanel",
        namedArgs: { title: "Tab Panel" },
      } as const)
    : null;
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
    <DropWatcherPanel
      className={classes.tabDropDetector}
      aria-label="tab drop detector"
      parentPath={parentPath}
      parentNodeType="tabPanel"
      child_loc={index}
      dropFilters={dropFilters}
      wrappingNode={wrap_in_tab_panel}
      messageOnHover=""
      style={
        {
          "--baseWidth": baseWidth,
          order: index - 1,
        } as React.CSSProperties
      }
      visibleWhenEmpty={true}
    >
      {children}
    </DropWatcherPanel>
  );
}
