import type { CSSMeasure } from "../inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";

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
      inputType: "string",
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
      units: ["%", "px"],
      optional: true,
    },
  },
  category: "layouts",
  description: "Collapsible sidebar",
  allowedParents: ["navbarPage"],
});
