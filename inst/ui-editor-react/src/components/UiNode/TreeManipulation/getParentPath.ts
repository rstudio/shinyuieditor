import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";

export function getParentPath(path: NodePath): NodePath {
  return path.slice(0, path.length - 1);
}

export function getChildIndex(path: NodePath): number {
  return path[path.length - 1];
}
