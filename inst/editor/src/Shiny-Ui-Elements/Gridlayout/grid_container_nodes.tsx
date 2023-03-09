import type { ShinyUiNodeNames } from "../uiNodeTypes";

// Note the use of satisfies to enforce type but then type casting to string
// array to avoid circular dependence in types
export const grid_container_nodes = [
  "gridlayout::grid_container",
  "gridlayout::grid_page",
] satisfies ShinyUiNodeNames[] as string[];
