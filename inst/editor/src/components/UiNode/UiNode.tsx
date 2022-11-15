import type { ShinyUiNode } from "../../main";
import type {
  NodePath,
  UiNodeComponent,
} from "../../Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "../../Shiny-Ui-Elements/uiNodeTypes";

import { useMakeWrapperProps } from "./useMakeWrapperProps";

type UiNodeSettings = {
  path: NodePath;
  node: ShinyUiNode;
};
/**
 * Recursively render the nodes in a UI Tree
 */
const UiNode = ({ path, node }: UiNodeSettings) => {
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
      path={path}
    />
  );
};

export default UiNode;
