import type { NodePath } from "../NodePath";

export function nodeDepth(path: NodePath): number {
  return path.length;
}
