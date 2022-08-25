import React from "react";

import type {
  NodePath,
  ShinyUiNode,
  UiNodeComponent,
} from "Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "Shiny-Ui-Elements/uiNodeTypes";

import { useMakeDraggable } from "../../DragAndDropHelpers/useMakeDraggable";

import { usePathInformation } from "./usePathInformation";

type UiNodeSettings = {
  path?: NodePath;
  /**
   * Should this node be allowed to be dragged out of its parent node? This
   * would be set to false for a container that typically always stays wrapped
   * around a single child where almost every time the user wants to move the
   * child they want the container to move with it. E.g. a grid panel with a
   * single element in it
   */
  canMove?: boolean;
};
/**
 * Recursively render the nodes in a UI Tree
 */
const UiNode = ({
  path = [],
  canMove = true,
  ...node
}: UiNodeSettings & ShinyUiNode) => {
  const componentRef = React.useRef<HTMLDivElement>(null);
  const { uiName, uiArguments, uiChildren } = node;

  const componentInfo = shinyUiNodeInfo[uiName];

  useMakeDraggable({
    ref: componentRef,
    nodeInfo: { node, currentPath: path },
    immovable: !canMove,
  });
  usePathInformation(componentRef, path);

  const Comp = componentInfo.UiComponent as UiNodeComponent<typeof uiArguments>;
  return (
    <Comp
      uiArguments={uiArguments}
      uiChildren={uiChildren}
      compRef={componentRef}
      nodeInfo={{ path }}
    />
  );
};

export default UiNode;
