import UiNode from "../../components/UiNode/UiNode";
import type { NodePath } from "../NodePath";
import { makeChildPath, pathToString } from "../nodePathUtils";
import type { ShinyUiNode } from "../ShinyUiNode";

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
