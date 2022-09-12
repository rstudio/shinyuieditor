import UiNode from "components/UiNode/UiNode";
import { makeChildPath, pathToString } from "Shiny-Ui-Elements/nodePathUtils";
import type { NodePath, ShinyUiChildren } from "Shiny-Ui-Elements/uiNodeTypes";

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
