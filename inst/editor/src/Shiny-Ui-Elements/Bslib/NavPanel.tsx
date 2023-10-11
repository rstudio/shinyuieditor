// import icon from "../../assets/icons/tabPanel.png";
import { DropWatcherPanel } from "../../DragAndDropHelpers/DropWatcherPanel";
import { nav_panel } from "../../ui-node-definitions/Bslib/nav_panel";
import type { ShinyUiNodeIds } from "../../ui-node-definitions/uiNodeTypes";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";
import { RenderUiChildren } from "../utils/RenderUiChildren";

export const invalidNavPanelContents: ShinyUiNodeIds[] = [
  "navbarPage",
  "nav_panel",
  "grid_card",
  "grid_card_plot",
  "grid_card_text",
];

const dropFilters = {
  rejected: invalidNavPanelContents,
};

export const bslibNavPanelInfo = addEditorInfoToUiNode(nav_panel, {
  UiComponent: ({ namedArgs, children, path, wrapperProps }) => {
    const hasChildren = children && children.length > 0;

    return (
      <div className="relative h-full w-full p-1" {...wrapperProps}>
        {hasChildren ? (
          <RenderUiChildren children={children} parentPath={path} />
        ) : (
          <DropWatcherPanel
            className="w-full h-full"
            child_loc={0}
            parentPath={path}
            dropFilters={dropFilters}
            parentNodeType="nav_panel"
            visibleWhenEmpty
          />
        )}
      </div>
    );
  },
});
