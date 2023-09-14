// import icon from "../../assets/icons/tabsetPanel.png";

import UiNode from "../../components/UiNode/UiNode";
import { DropWatcherPanel } from "../../DragAndDropHelpers/DropWatcherPanel";
import { makeChildPath } from "../../ui-node-definitions/nodePathUtils";
import { addEditorInfoById } from "../utils/add_editor_info_to_ui_node";
import { RenderUiChildren } from "../utils/RenderUiChildren";

import classes from "./ShinyLayoutSidebar.module.css";

export const shinyLayoutSidebarInfo = addEditorInfoById("layout_sidebar", {
  UiComponent: ({
    namedArgs: { position, sidebar, main },
    children,
    path,
    wrapperProps,
  }) => {
    return (
      <div className={classes.container} {...wrapperProps}>
        <UiNode path={makeChildPath(path, "sidebar")} node={sidebar} />
        <UiNode path={makeChildPath(path, "main")} node={main} />
      </div>
    );
  },
});

export const shinyPanelMainInfo = addEditorInfoById("panel_main", {
  UiComponent: ({ namedArgs, children, path, wrapperProps }) => {
    const hasChildren = children && children.length > 0;

    return (
      <div {...wrapperProps}>
        {hasChildren ? (
          <RenderUiChildren children={children} parentPath={path} />
        ) : (
          <DropWatcherPanel
            className={classes.dropWatcherPanel}
            child_loc={0}
            parentPath={path}
            minHeightOnAvailable="100%"
            messageOnHover={"Add to main panel"}
            parentNodeType="layout_sidebar"
          />
        )}
      </div>
    );
  },
});
