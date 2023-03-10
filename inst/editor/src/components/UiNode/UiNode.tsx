import type {
  NodePath,
  ShinyUiNode,
  UiNodeComponent,
} from "../../Shiny-Ui-Elements/uiNodeTypes";
import { getUiNodeInfo } from "../../Shiny-Ui-Elements/uiNodeTypes";
import { isParentNode } from "../../Shiny-Ui-Elements/uiNodeTypes";

import { useMakeWrapperProps } from "./useMakeWrapperProps";

export type UiNodeProps = {
  path: NodePath;
  node: ShinyUiNode;
  canDrag?: boolean;
};
/**
 * Recursively render the nodes in a UI Tree
 */
const UiNode = ({ path, node, canDrag = true }: UiNodeProps) => {
  // const { uiName, uiArguments, uiChildren } = node;

  const Comp = getUiNodeInfo(node.uiName).UiComponent as UiNodeComponent<
    typeof node.uiArguments
  >;

  const wrapperProps = useMakeWrapperProps({ path, node, canDrag });

  return (
    <Comp
      wrapperProps={wrapperProps}
      uiArguments={node.uiArguments}
      uiChildren={isParentNode(node) ? node.uiChildren : []}
      path={path}
    />
  );
};

export default UiNode;
