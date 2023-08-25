import { nodeInfoFactory } from "../nodeInfoFactory";

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
});
