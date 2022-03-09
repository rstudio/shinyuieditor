import React from "react";

import { useNodeSelectionState } from "NodeSelectionState";
import { sameArray } from "utils/equalityCheckers";

import { useMakeDraggable } from "../DragAndDropHelpers/useMakeDraggable";
import type {
  NodePath,
  ShinyUiNode,
  UiContainerNodeComponent,
  UiNodeComponent,
} from "../Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "../Elements/uiNodeTypes";

import classes from "./styles.module.css";

/**
 * Recursively render the nodes in a UI Tree
 */
const UiNode = ({ path = [], ...node }: { path?: NodePath } & ShinyUiNode) => {
  const componentRef = React.useRef<HTMLDivElement>(null);
  const { uiName, uiArguments, uiChildren } = node;
  const [selectedPath, setNodeSelection] = useNodeSelectionState();
  const isSelected = selectedPath ? sameArray(path, selectedPath) : false;

  const componentInfo = shinyUiNodeInfo[uiName];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodeSelection(path);
  };

  useMakeDraggable(componentRef, { node, currentPath: path });

  if (componentInfo.acceptsChildren === true) {
    const Comp = componentInfo.UiComponent as UiContainerNodeComponent<
      typeof uiArguments
    >;

    return (
      <Comp
        uiArguments={uiArguments}
        uiChildren={uiChildren ?? []}
        compRef={componentRef}
        eventHandlers={{
          onClick: handleClick,
        }}
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
      eventHandlers={{
        onClick: handleClick,
      }}
      nodeInfo={{ path }}
    >
      {isSelected ? <div className={classes.selectedOverlay} /> : null}
    </Comp>
  );
};

export default UiNode;
