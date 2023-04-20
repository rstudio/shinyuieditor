import type { NodePath } from "ui-node-definitions/src/NodePath";
import {
  makeChildPath,
  pathToString,
} from "ui-node-definitions/src/nodePathUtils";
import type { ShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

import UiNode from "../../components/UiNode/UiNode";

/**
 * Render basic Ui children
 * @param args
 * @returns
 */
export function RenderUiChildren({
  children,
  parentPath,
}: {
  children: Array<ShinyUiNode>;
  parentPath: NodePath;
}) {
  return (
    <>
      {children.map((childNode, i) => {
        const nodePath = makeChildPath(parentPath, i);
        return (
          <UiNode
            key={pathToString(nodePath)}
            path={nodePath}
            node={childNode}
          />
        );
      })}
    </>
  );
}
