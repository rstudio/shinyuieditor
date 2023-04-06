import React from "react";

import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import { invalidTabPanelContents } from "../../../Shiny-Ui-Elements/ShinyTabPanel/ShinyTabPanel";
import type {
  NodePath,
  ShinyUiNode,
} from "../../../Shiny-Ui-Elements/uiNodeTypes";

import classes from "./Tabset.module.css";

const dropFilters = {
  rejected: invalidTabPanelContents.filter((id) => id !== "shiny::tabPanel"),
};

const wrap_in_tab_panel = ({ id }: ShinyUiNode) => {
  return id !== "shiny::tabPanel"
    ? ({
        id: "shiny::tabPanel",
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
      parentNodeType="shiny::tabPanel"
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
