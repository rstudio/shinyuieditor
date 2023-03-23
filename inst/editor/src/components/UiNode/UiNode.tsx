import React from "react";

import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

import type {
  NodePath,
  ShinyUiNode,
  UiNodeComponent,
} from "../../Shiny-Ui-Elements/uiNodeTypes";
import {
  getUiNodeInfo,
  isParentNode,
} from "../../Shiny-Ui-Elements/uiNodeTypes";

import { UiNodeErrorView } from "./UiNodeErrorView";
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
  const node_info = getUiNodeInfo(node.uiName);

  const Comp = node_info.UiComponent as UiNodeComponent<
    typeof node.uiArguments,
    { TakesChildren: true }
  >;

  const wrapperProps = useMakeWrapperProps({ path, node, canDrag });

  const fallbackRender = React.useMemo(
    () => (fallbackProps: FallbackProps) => {
      return <UiNodeErrorView node={node} path={path} {...fallbackProps} />;
    },
    [node, path]
  );

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <Comp
        wrapperProps={wrapperProps}
        uiArguments={node.uiArguments}
        uiChildren={isParentNode(node) ? node.uiChildren ?? [] : []}
        path={path}
      />
    </ErrorBoundary>
  );
};

export default UiNode;
