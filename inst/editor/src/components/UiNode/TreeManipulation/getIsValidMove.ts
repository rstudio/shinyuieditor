import type { NodePath } from "../../../Shiny-Ui-Elements/uiNodeTypes";

import { aIsParentOfB } from "./aIsParentOfB";
import { nodesShareCommonParent } from "./nodesShareCommonParent";

export function getIsValidMove({
  fromPath,
  toPath,
}: {
  fromPath: NodePath | undefined | null;
  toPath: NodePath;
}): boolean {
  if (fromPath === undefined || fromPath === null) return true;

  // Can't move a node to be its own child
  if (aIsParentOfB(fromPath, toPath)) {
    return false;
  }

  if (nodesShareCommonParent(fromPath, toPath)) {
    // A move of a node to its own position or the one immediately following are
    // effectivly 'no ops' so we count them as invalid
    const depth = fromPath.length;
    const fromIndex = fromPath[depth - 1];
    const toIndex = toPath[depth - 1];
    if (fromIndex === toIndex || fromIndex === toIndex - 1) return false;
  }

  return true;
}
