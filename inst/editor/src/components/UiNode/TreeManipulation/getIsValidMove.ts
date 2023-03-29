import type { NodePath } from "../../../Shiny-Ui-Elements/uiNodeTypes";

import { aIsParentOfB } from "./aIsParentOfB";
import { separateIntoParentAndChildPaths } from "./getParentPath";
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
  // We only need to be careful if we're moving a node to somewhere in its same branch
  if (nodesShareCommonParent(fromPath, toPath)) {
    const to_paths = separateIntoParentAndChildPaths(toPath);
    const from_paths = separateIntoParentAndChildPaths(fromPath);

    if (
      to_paths.child_location === "missing" ||
      from_paths.child_location === "missing"
    ) {
      return false;
    }

    // Moving a node to the same position is a 'no op' so we count it as invalid
    if (to_paths.child_path === from_paths.child_path) {
      return false;
    }

    // Moving a child node to the position immediately following is
    // effectivly a 'no ops' so we count them as invalid
    if (
      to_paths.child_location === "uiChildren" &&
      from_paths.child_location === "uiChildren" &&
      from_paths.child_path === to_paths.child_path - 1
    ) {
      return false;
    }
  }

  return true;
}
