import { useState } from "react";

import { ChevronLeft } from "react-bootstrap-icons";
import { getParentPath } from "ui-node-definitions/src/TreeManipulation/getParentPath";

import { useSetCurrentSelection } from "../../state/selectedPath";
import { ChildrenWithDropNodes } from "../ChildrenWithDropNodes";
import { add_editor_info_by_id } from "../utils/add_editor_info_to_ui_node";

import classes from "./Sidebar.module.css";

export const bslibSidebar = add_editor_info_by_id("sidebar", {
  UiComponent: ({ namedArgs, children = [], path, wrapperProps }) => {
    const setSelection = useSetCurrentSelection();
    return (
      <div {...wrapperProps}>
        <div
          className={classes.sidebar}
          style={
            {
              "--open-w": namedArgs.width ?? "180px",
            } as React.CSSProperties
          }
        >
          <div className={classes.sidebarContent}>
            <h2 className={classes.title}>{namedArgs.title}</h2>
            <ChildrenWithDropNodes
              children={children}
              parentPath={path}
              parentid="sidebar"
              messageOnHover="Add to card sidebar"
            />
          </div>
          <CollapserTab
            onCollapse={() => {
              setSelection(getParentPath(path));
            }}
            onExpand={() => {
              setSelection(path);
            }}
          />
        </div>
      </div>
    );
  },
});

function CollapserTab({
  onCollapse,
  onExpand,
}: {
  onCollapse: () => void;
  onExpand: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={classes.openToggle}
      title={`${collapsed ? "Expand" : "Collapse"} sidebar`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const parent_classes = e.currentTarget.parentElement?.classList;
        if (!parent_classes) {
          // This should always exist, but just in case...
          return;
        }

        const collapsing = !parent_classes.contains(classes.collapsed);

        if (collapsing) {
          onCollapse();
          setCollapsed(true);
          parent_classes.add(classes.collapsed);
        } else {
          onExpand();
          setCollapsed(false);
          parent_classes.remove(classes.collapsed);
        }
      }}
    >
      <ChevronLeft />
    </div>
  );
}
