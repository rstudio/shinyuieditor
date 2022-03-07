import React from "react";

import { useNodeSelectionState } from "NodeSelectionState";
import { sameArray } from "utils/equalityCheckers";

import {
  buildDropHandlers,
  createDragStartCallback,
} from "../DragAndDropHelpers/DragAndDropHelpers";
import {
  NodePath,
  ShinyUiNode,
  shinyUiNodeInfo,
  UiContainerNodeComponent,
  UiNodeComponent,
} from "../Elements/uiNodeTypes";

import classes from "./styles.module.css";
import { sendTreeUpdateMessage } from "./TreeManipulation/treeUpdateEvents";

/**
 * Recursively render the nodes in a UI Tree
 */
const UiNode = ({ path = [], ...node }: { path?: NodePath } & ShinyUiNode) => {
  const { uiName, uiArguments, uiChildren } = node;
  const [selectedPath, setNodeSelection] = useNodeSelectionState();
  const isSelected = selectedPath ? sameArray(path, selectedPath) : false;

  const componentInfo = shinyUiNodeInfo[uiName];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodeSelection(path);
  };
  const handleStartDrag = createDragStartCallback({ node, currentPath: path });

  if (componentInfo.acceptsChildren === true) {
    const Comp = componentInfo.UiComponent as UiContainerNodeComponent<
      typeof uiArguments
    >;
    const dragAndDropCallbacks = buildDropHandlers(({ node, currentPath }) => {
      // Let the state know we have a new child node
      sendTreeUpdateMessage({
        type: "PLACE_NODE",
        node,
        currentPath,
        parentPath: path,
      });
    });

    return (
      <Comp
        uiArguments={uiArguments}
        uiChildren={uiChildren ?? []}
        eventHandlers={{
          ...dragAndDropCallbacks,
          onClick: handleClick,
          onDragStart: handleStartDrag,
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
      eventHandlers={{
        onClick: handleClick,
        onDragStart: handleStartDrag,
        draggable: true,
      }}
      nodeInfo={{ path }}
    >
      {isSelected ? <div className={classes.selectedOverlay} /> : null}
    </Comp>
  );
};

export default UiNode;
