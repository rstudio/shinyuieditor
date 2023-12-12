import { DropWatcherPanel } from "../../DragAndDropHelpers/DropWatcherPanel";
import type { NodePath } from "../NodePath";

import classes from "./Sidebar.module.css";

export function SidebarDropWatcherPanel({ path }: { path: NodePath }) {
  return (
    <DropWatcherPanel
      className={classes.sidebarDropWatcherPanel}
      child_loc={"sidebar"}
      parentPath={path}
      wrappingNode={{
        id: "sidebar",
        namedArgs: {
          title: "Sidebar Title",
        },
      }}
      minHeightOnAvailable="100%"
      messageOnHover={"Add a sidebar"}
      parentNodeType="sidebar"
    />
  );
}
