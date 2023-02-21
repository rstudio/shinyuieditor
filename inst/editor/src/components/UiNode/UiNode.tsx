import type { ShinyUiNode } from "../../main";
import type {
  NodePath,
  UiNodeComponent,
} from "../../Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "../../Shiny-Ui-Elements/uiNodeTypes";

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
  const { uiName, uiArguments, uiChildren } = node;

  const Comp = shinyUiNodeInfo[uiName].UiComponent as UiNodeComponent<
    typeof uiArguments
  >;

  const wrapperProps = useMakeWrapperProps({ path, node, canDrag });

  return (
    <Comp
      wrapperProps={wrapperProps}
      uiArguments={uiArguments}
      uiChildren={uiChildren ?? []}
      path={path}
    />
  );
};

export default UiNode;
