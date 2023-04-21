import React from "react";

import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";
import type { NodePath } from "ui-node-definitions/src/NodePath";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";
import { isParentNode } from "ui-node-definitions/src/ShinyUiNode";

import { getUiNodeComponent } from "../../Shiny-Ui-Elements/registered_ui_nodes";
import type { UiNodeComponent } from "../../Shiny-Ui-Elements/utils/add_editor_info_to_ui_node";

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
  // Bit ugly here.
  const Comp = getUiNodeComponent(node.id) as UiNodeComponent<
    typeof node.namedArgs,
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
        namedArgs={node.namedArgs}
        children={isParentNode(node) ? node.children ?? [] : []}
        path={path}
      />
    </ErrorBoundary>
  );
};

export default UiNode;
