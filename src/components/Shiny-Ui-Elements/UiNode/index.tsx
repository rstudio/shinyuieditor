import React from "react";

import { NodeSelectionContext } from "EditorContainer";
import { sameArray } from "utils/equalityCheckers";

import {
  createDragStartCallback,
  useDragAndDropElements,
} from "../DragAndDropHelpers/useDragAndDropElements";
import {
  NodePath,
  ShinyUiNode,
  shinyUiNodeInfo,
  UiNodeComponent,
} from "../Elements/uiNodeTypes";

import classes from "./styles.module.css";

/**
 * Recursively render the nodes in a UI Tree
 */
const UiNode = ({
  path = [],
  selectedPath,
  ...node
}: { path?: NodePath; selectedPath: NodePath | null } & ShinyUiNode) => {
  const { uiName, uiArguments, uiChildren } = node;
  const setNodeSelection = React.useContext(NodeSelectionContext);

  const componentInfo = shinyUiNodeInfo[uiName];
  const Comp = componentInfo.UiComponent as UiNodeComponent<typeof uiArguments>;

  const isSelected = selectedPath ? sameArray(path, selectedPath) : false;

  const dragAndDropCallbacks = useDragAndDropElements(
    path,
    componentInfo.acceptsChildren
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodeSelection(path);
  };

  const handleStartDrag = createDragStartCallback({ node, currentPath: path });

  return (
    <Comp
      uiArguments={uiArguments}
      {...dragAndDropCallbacks}
      draggable
      onDragStart={handleStartDrag}
      onClick={handleClick}
    >
      {uiChildren?.map((childNode, i) => (
        <UiNode
          key={path.join(".") + i}
          path={[...path, i]}
          selectedPath={selectedPath}
          {...childNode}
        />
      ))}
      {isSelected ? <div className={classes.selectedOverlay} /> : null}
    </Comp>
  );
};

export default UiNode;
