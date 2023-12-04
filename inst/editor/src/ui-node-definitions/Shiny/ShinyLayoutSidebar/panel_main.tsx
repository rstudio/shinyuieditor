import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import { RenderUiChildren } from "../../utils/RenderUiChildren";

export const panel_main = nodeInfoFactory<{}>()({
  id: "panel_main",
  py_info: {
    fn_name: "ui.panel_main",
    package: "shiny",
  },
  title: "Main content panel",
  takesChildren: true,
  settingsInfo: {},
  category: "Layout",
  description:
    "Container for content placed in the `main` area of a sidebar layout",
  ui_component: ({ namedArgs, children, path, wrapperProps }) => {
    const hasChildren = children && children.length > 0;

    return (
      <div {...wrapperProps}>
        {hasChildren ? (
          <RenderUiChildren children={children} parentPath={path} />
        ) : (
          <DropWatcherPanel
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
