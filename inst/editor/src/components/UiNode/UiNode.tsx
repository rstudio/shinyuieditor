import React from "react";

import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

import type { NodePath } from "../../ui-node-definitions/NodePath";
import type { ShinyUiNode } from "../../ui-node-definitions/ShinyUiNode";
import { isParentNode } from "../../ui-node-definitions/ShinyUiNode";
import { getUiNodeInfo } from "../../ui-node-definitions/uiNodeTypes";
import type { UiNodeComponent } from "../../ui-node-definitions/utils/add_editor_info_to_ui_node";

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

function UiNode({ path, node, canDrag = true }: UiNodeProps) {
  // Bit ugly here.
  // eslint-disable-next-line @typescript-eslint/naming-convention
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
}

export default UiNode;

/**
 *
 * @param id Name of ui node to look up
 * @returns Component used to render that node
 * @throws Error if node doesn't exist
 */
function getUiNodeComponent(id: string) {
  return getUiNodeInfo(id).ui_component;
}
