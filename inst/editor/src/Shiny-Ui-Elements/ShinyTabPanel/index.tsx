import { tab_panel } from "ui-node-definitions/src/Shiny/tab_panel";
import type { ShinyUiNodeIds } from "ui-node-definitions/src/uiNodeTypes";

import icon from "../../assets/icons/tabPanel.png";
import { DropWatcherPanel } from "../../DragAndDropHelpers/DropWatcherPanel";
import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";
import { RenderUiChildren } from "../utils/RenderUiChildren";

import classes from "./ShinyTabPanel.module.css";

export const invalidTabPanelContents: ShinyUiNodeIds[] = [
  "navbarPage",
  "tabPanel",
  "grid_card",
  "grid_card_plot",
  "grid_card_text",
];

const dropFilters = {
  rejected: invalidTabPanelContents,
};

export const shinyTabPanelInfo = add_editor_info_to_ui_node(tab_panel, {
  UiComponent: ({ namedArgs, children, path, wrapperProps }) => {
    const hasChildren = children && children.length > 0;

    return (
      <div className={classes.container} {...wrapperProps}>
        {hasChildren ? (
          <RenderUiChildren children={children} parentPath={path} />
        ) : (
          <DropWatcherPanel
            className={classes.emptyTabPanelDropDetector}
            child_loc={0}
            parentPath={path}
            dropFilters={dropFilters}
            parentNodeType="tabPanel"
            visibleWhenEmpty
          />
        )}
      </div>
    );
  },
  iconSrc: icon,
});
