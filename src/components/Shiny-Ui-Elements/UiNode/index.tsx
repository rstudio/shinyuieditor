import { NodeSelectionContext } from "EditorContainer";
import React from "react";
import { sameArray } from "utils/equalityCheckers";
import { useDragAndDropElements } from "../DragAndDropHelpers/useDragAndDropElements";
import { UiNodeComponent } from "../Elements/uiComponentAndSettings";
import { NodePath, ShinyUiNode, uiComponentAndSettings } from "../uiNodeTypes";
import classes from "./styles.module.css";

/**
 * Recursively render the nodes in a UI Tree
 */

const UiNode = ({
  path = [],
  selectedPath,
  uiName,
  uiArguments,
  uiChildren,
}: { path?: NodePath; selectedPath: NodePath | null } & ShinyUiNode) => {
  const setNodeSelection = React.useContext(NodeSelectionContext);

  const componentInfo = uiComponentAndSettings[uiName];
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

  return (
    <Comp
      uiArguments={uiArguments}
      {...dragAndDropCallbacks}
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
