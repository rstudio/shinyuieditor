import type { NodePath } from "./uiNodeTypes";

export function makeChildPath(path: NodePath, childIndex: number): NodePath {
  return [...path, childIndex];
}

export function pathToString(path: NodePath): string {
  return path.join("-");
}
