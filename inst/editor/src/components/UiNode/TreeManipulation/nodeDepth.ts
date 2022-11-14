import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";

export function nodeDepth(path: NodePath): number {
  return path.length;
}
