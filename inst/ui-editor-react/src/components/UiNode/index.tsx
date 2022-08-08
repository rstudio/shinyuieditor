import React from "react";

import { useNodeSelectionState } from "NodeSelectionState";
import type {
  NodePath,
  ShinyUiNode,
  UiContainerNodeComponent,
  UiNodeComponent,
} from "Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "Shiny-Ui-Elements/uiNodeTypes";
import { sameArray } from "utils/equalityCheckers";

import { useMakeDraggable } from "../../DragAndDropHelpers/useMakeDraggable";

import classes from "./styles.module.css";
import { useDataPath } from "./useDataPath";

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
  const [selectedPath, setNodeSelection] = useNodeSelectionState();
  const isSelected = selectedPath ? sameArray(path, selectedPath) : false;

  const componentInfo = shinyUiNodeInfo[uiName];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodeSelection(path);
  };

  useMakeDraggable({
    ref: componentRef,
    nodeInfo: { node, currentPath: path },
    immovable: !canMove,
  });
  useDataPath({ ref: componentRef, path });

  if (componentInfo.acceptsChildren === true) {
    const Comp = componentInfo.UiComponent as UiContainerNodeComponent<
      typeof uiArguments
    >;

    return (
      <Comp
        uiArguments={uiArguments}
        uiChildren={uiChildren ?? []}
        compRef={componentRef}
        eventHandlers={{ onClick: handleClick }}
        nodeInfo={{ path }}
      >
        {isSelected ? <div className={classes.selectedOverlay} /> : null}
      </Comp>
    );
  }
  const Comp = componentInfo.UiComponent as UiNodeComponent<typeof uiArguments>;

  return (
    <Comp
      uiArguments={uiArguments}
      compRef={componentRef}
      eventHandlers={{ onClick: handleClick }}
      nodeInfo={{ path }}
    >
      {isSelected ? <div className={classes.selectedOverlay} /> : null}
    </Comp>
  );
};

export default UiNode;
