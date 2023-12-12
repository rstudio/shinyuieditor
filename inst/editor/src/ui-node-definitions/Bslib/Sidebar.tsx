import { useState } from "react";
import React from "react";

import { ChevronLeft } from "react-bootstrap-icons";

import { NodeWrapper } from "../../components/UiNode/NodeWraper";
import { useSetCurrentSelection } from "../../state/selectedPath";
import { mergeClasses } from "../../utils/mergeClasses";
import { ChildrenWithDropNodes } from "../ChildrenWithDropNodes";
import type { CSSMeasure } from "../inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";
import { getParentPath } from "../TreeManipulation/getParentPath";
import { addEditorInfoById } from "../utils/add_editor_info_to_ui_node";

import classes from "./Sidebar.module.css";

export const sidebar = nodeInfoFactory<{
  title: string;
  open?: "desktop" | "open" | "closed" | "always";
  width?: CSSMeasure;
  id?: string;
}>()({
  id: "sidebar",
  r_info: {
    fn_name: "sidebar",
    package: "bslib",
  },
  py_info: {
    fn_name: "ui.sidebar",
    package: "shiny",
  },
  title: "Sidebar",
  takesChildren: true,
  settingsInfo: {
    title: {
      inputType: "string",
      label: "Title",
      defaultValue: "Sidebar Title",
    },
    id: {
      inputType: "id",
      label: "Id for tabset",
      defaultValue: "tabset-default-id",
      optional: true,
    },
    open: {
      inputType: "radio",
      label: "Initial open state",
      defaultValue: "desktop",
      choices: {
        desktop: { label: "Desktop" },
        open: { label: "Open" },
        closed: { label: "Closed" },
        always: { label: "Always" },
      },
      optionsPerColumn: 2,
      optional: true,
    },
    width: {
      inputType: "cssMeasure",
      label: "Width",
      defaultValue: "250px",
      units: ["px", "rem"],
      optional: true,
    },
  },
  category: "Layout",
  description: "Collapsible sidebar",
  allowedParents: ["navbarPage"],
  ui_component: ({ namedArgs, children = [], path, wrapperProps }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
