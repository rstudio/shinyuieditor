import type { NodePath } from "ui-node-definitions/src/NodePath";

export function nodeDepth(path: NodePath): number {
  return path.length;
}
