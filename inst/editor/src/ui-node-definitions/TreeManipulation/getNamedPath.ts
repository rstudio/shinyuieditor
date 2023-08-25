import type { NodePath } from "../NodePath";
import type { ShinyUiNode } from "../ShinyUiNode";
import { getUiNodeTitle } from "../uiNodeTypes";

import { getNode } from "./getNode";

export function getNamedPath(path: NodePath, tree: ShinyUiNode): string[] {
  const totalDepth = path.length;
  let pathString: string[] = [];
  for (let depth = 0; depth <= totalDepth; depth++) {
    const nodeAtDepth = getNode(tree, path.slice(0, depth));
    if (nodeAtDepth === undefined) {
      // If the selection is not valid (node probably just got moved) then don't
      // render breadcrumb
      break;
    }

    pathString.push(getUiNodeTitle(nodeAtDepth.id));
  }

  return pathString;
}
