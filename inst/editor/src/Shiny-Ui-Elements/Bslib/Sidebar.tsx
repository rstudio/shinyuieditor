import { useState } from "react";

import { ChevronLeft } from "react-bootstrap-icons";

import { NodeWrapper } from "../../components/UiNode/NodeWraper";
import { useSetCurrentSelection } from "../../state/selectedPath";
import { getParentPath } from "../../ui-node-definitions/TreeManipulation/getParentPath";
import { mergeClasses } from "../../utils/mergeClasses";
import { ChildrenWithDropNodes } from "../ChildrenWithDropNodes";
import { addEditorInfoById } from "../utils/add_editor_info_to_ui_node";

import classes from "./Sidebar.module.css";

export const bslibSidebar = addEditorInfoById("sidebar", {
  UiComponent: ({ namedArgs, children = [], path, wrapperProps }) => {
    const setSelection = useSetCurrentSelection();
    return (
      <NodeWrapper wrapperProps={wrapperProps} className={classes.outerWrapper}>
        <div
          className={mergeClasses("bg-background-light", classes.sidebar)}
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
      </NodeWrapper>
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
      className={mergeClasses("bg-background-light", classes.openToggle)}
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
