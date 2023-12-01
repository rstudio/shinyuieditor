import { DropWatcherPanel } from "../../DragAndDropHelpers/DropWatcherPanel";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { MakeShinyUiNode } from "../ShinyUiNode";
import type { ShinyUiNodeIds } from "../uiNodeTypes";
import { RenderUiChildren } from "../utils/RenderUiChildren";

type NavPanelSettings = {
  title: string;
};

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

export type NavPanelNode = MakeShinyUiNode<NavPanelSettings>;

export const nav_panel = nodeInfoFactory<NavPanelSettings>()({
  id: "nav_panel",
  r_info: {
    fn_name: "nav_panel",
    package: "bslib",
    fn_aliases: [
      {
        fn_name: "tab_panel",
        package: "shiny",
      },
    ],
  },
  py_info: {
    fn_name: "ui.nav",
    package: "shiny",
  },
  title: "Nav Panel",
  takesChildren: true,
  settingsInfo: {
    title: {
      label: "Title of panel",
      inputType: "string",
      defaultValue: "My Shiny App",
      py_positional_index: 0,
    },
  },
  category: "Tabs",
  description:
    "Panel containing content for tab-based interfaces like navbar pages",
  ui_component: ({ namedArgs, children, path, wrapperProps }) => {
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
