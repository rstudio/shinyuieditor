import type { ShinyUiNames } from "components/Shiny-Ui-Elements/uiNodeTypes";

// These are nodes that don't need to be wrapped in a grid_panel if dropped

export type GridAwareNodes = Extract<
  ShinyUiNames,
  | "gridlayout::grid_panel"
  | "gridlayout::grid_panel_text"
  | "gridlayout::grid_panel_stack"
  | "gridlayout::grid_panel_plot"
>;

export const gridAwareNodes: ShinyUiNames[] = [
  "gridlayout::grid_panel",
  "gridlayout::grid_panel_text",
  "gridlayout::grid_panel_stack",
  "gridlayout::grid_panel_plot",
];
