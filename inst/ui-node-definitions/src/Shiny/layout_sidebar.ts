import { nodeInfoFactory } from "../nodeInfoFactory";

export const layout_sidebar = nodeInfoFactory<{
  position?: "left" | "right";
}>()({
  id: "layout_sidebar",
  py_info: {
    fn_name: "ui.layout_sidebar",
    package: "shiny",
  },
  title: "Sidebar Layout",
  takesChildren: true,
  settingsInfo: {
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
