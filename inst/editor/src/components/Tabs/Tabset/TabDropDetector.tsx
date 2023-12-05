import React from "react";

import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import { invalidNavPanelContents } from "../../../ui-node-definitions/Bslib/nav_panel";
import type { NodePath } from "../../../ui-node-definitions/NodePath";
import type { ShinyUiNode } from "../../../ui-node-definitions/ShinyUiNode";

import classes from "./Tabset.module.css";

const dropFilters = {
  rejected: invalidNavPanelContents.filter((id) => id !== "nav_panel"),
};

const wrap_in_tab_panel = ({ id }: ShinyUiNode) => {
  return id !== "nav_panel"
    ? ({
        id: "nav_panel",
        namedArgs: { title: "Nav Panel" },
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
      className={`w-[--baseWidth] h-full relative data-[can-accept-drop=true]:w-[--availableWidth]`}
      aria-label="tab drop detector"
      parentPath={parentPath}
      parentNodeType="nav_panel"
      child_loc={index}
      dropFilters={dropFilters}
      wrappingNode={wrap_in_tab_panel}
      messageOnHover=""
      style={
        {
          "--baseWidth": baseWidth,
          "--availableWidth": `calc(2*${baseWidth})`,
          order: index - 1,
        } as React.CSSProperties
      }
      visibleWhenEmpty={true}
    >
      {children}
    </DropWatcherPanel>
  );
}
