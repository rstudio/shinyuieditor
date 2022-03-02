import React from "react";

import { NodeSelectionContext } from "NodeSelectionContext";
import { sameArray } from "utils/equalityCheckers";

import {
  createDragStartCallback,
  useDragAndDropElements,
} from "../DragAndDropHelpers/useDragAndDropElements";
import {
  NodePath,
  ShinyUiNode,
  shinyUiNodeInfo,
  UiContainerNodeComponent,
  UiNodeComponent,
} from "../Elements/uiNodeTypes";

import classes from "./styles.module.css";

/**
 * Recursively render the nodes in a UI Tree
 */
const UiNode = ({ path = [], ...node }: { path?: NodePath } & ShinyUiNode) => {
  const { uiName, uiArguments, uiChildren } = node;
  const [selectedPath, setNodeSelection] =
    React.useContext(NodeSelectionContext);
  const isSelected = selectedPath ? sameArray(path, selectedPath) : false;

  const componentInfo = shinyUiNodeInfo[uiName];

  const dragAndDropCallbacks = useDragAndDropElements(
    path,
    componentInfo.acceptsChildren
  );
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodeSelection(path);
  };
  const handleStartDrag = createDragStartCallback({ node, currentPath: path });

  if (componentInfo.acceptsChildren === true) {
    const Comp = componentInfo.UiComponent as UiContainerNodeComponent<
      typeof uiArguments
    >;

    return (
      <Comp
        uiArguments={uiArguments}
        uiChildren={node.uiChildren ?? []}
        {...dragAndDropCallbacks}
        draggable
        onDragStart={handleStartDrag}
        onClick={handleClick}
        path={path}
      >
        {uiChildren?.map((childNode, i) => (
          <UiNode key={path.join(".") + i} path={[...path, i]} {...childNode} />
        ))}
        {isSelected ? <div className={classes.selectedOverlay} /> : null}
      </Comp>
    );
  }
  const Comp = componentInfo.UiComponent as UiNodeComponent<typeof uiArguments>;

  return (
    <Comp
      uiArguments={uiArguments}
      draggable
      onDragStart={handleStartDrag}
      onClick={handleClick}
      path={path}
    >
      {isSelected ? <div className={classes.selectedOverlay} /> : null}
    </Comp>
  );
};

export default UiNode;
