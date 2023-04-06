import type { ShinyUiNodeIds } from "../uiNodeTypes";

// Note the use of satisfies to enforce type but then type casting to string
// array to avoid circular dependence in types
export const grid_container_nodes = [
  "grid_container",
  "grid_page",
] satisfies ShinyUiNodeIds[] as string[];
