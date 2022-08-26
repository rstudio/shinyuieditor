import type {
  NodePath,
  ShinyUiNode,
  UiNodeComponent,
} from "Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "Shiny-Ui-Elements/uiNodeTypes";

import { useMakeWrapperProps } from "./useMakeWrapperProps";

type UiNodeSettings = {
  path: NodePath;
};
/**
 * Recursively render the nodes in a UI Tree
 */
const UiNode = ({ path, ...node }: UiNodeSettings & ShinyUiNode) => {
  const { uiName, uiArguments, uiChildren } = node;

  const Comp = shinyUiNodeInfo[uiName].UiComponent as UiNodeComponent<
    typeof uiArguments
  >;

  const wrapperProps = useMakeWrapperProps(node, path);

  return (
    <Comp
      wrapperProps={wrapperProps}
      uiArguments={uiArguments}
      uiChildren={uiChildren}
      nodeInfo={{ path }}
    />
  );
};

export default UiNode;
