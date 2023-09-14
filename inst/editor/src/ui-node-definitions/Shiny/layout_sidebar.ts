import { nodeInfoFactory } from "../nodeInfoFactory";
import type { ShinyUiNode } from "../ShinyUiNode";

export const layout_sidebar = nodeInfoFactory<{
  sidebar: ShinyUiNode;
  main: ShinyUiNode;
  position?: "left" | "right";
}>()({
  id: "layout_sidebar",
  py_info: {
    fn_name: "ui.panel_sidebar",
    package: "shiny",
  },
  title: "Sidebar Layout",
  takesChildren: true,
  settingsInfo: {
    sidebar: {
      inputType: "ui-node",
      defaultValue: {
        id: "sidebar",
        namedArgs: {
          title: "Sidebar",
        },
        children: [
          {
            id: "textNode",
            namedArgs: {
              text: "Sidebar content",
            },
          },
        ],
      },
    },
    main: {
      inputType: "ui-node",
      defaultValue: {
        id: "panel_main",
        namedArgs: {},
        children: [],
      },
    },
    position: {
      inputType: "radio",
      label: "Position",
      defaultValue: "left",
      choices: {
        left: { label: "Left" },
        right: { label: "Right" },
      },
      optional: true,
    },
  },
  category: "Layout",
  description: "Layout container for a sidebar and main panel",
});
