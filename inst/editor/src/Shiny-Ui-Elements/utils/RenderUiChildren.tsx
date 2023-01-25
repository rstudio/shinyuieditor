import UiNode from "../../components/UiNode/UiNode";
import { makeChildPath, pathToString } from "../nodePathUtils";
import type { ShinyUiChildren, NodePath } from "../uiNodeTypes";

/**
 * Render basic Ui children
 * @param args
 * @returns
 */
export function RenderUiChildren({
  uiChildren,
  parentPath,
}: {
  uiChildren: ShinyUiChildren;
  parentPath: NodePath;
}) {
  return (
    <>
      {uiChildren.map((childNode, i) => {
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
