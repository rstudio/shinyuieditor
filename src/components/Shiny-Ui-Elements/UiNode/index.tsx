import { NodeSelectionContext } from "EditorContainer";
import React from "react";
import { sameArray } from "utils/equalityCheckers";
import {
  uiComponentAndSettings,
  UiNodeComponent,
} from "../Elements/uiComponentAndSettings";
import { NodePath, UiNodeProps } from "../uiNodeTypes";
import classes from "./styles.module.css";
import { useDragAndDropElements } from "./useDragAndDropElements";

/**
 * Recursively render the nodes in a UI Tree
 */

const UiNode = ({
  path = [],
  selectedPath,
  uiName,
  uiArguments,
  uiChildren,
}: { path?: NodePath; selectedPath: NodePath | null } & UiNodeProps) => {
  const setNodeSelection = React.useContext(NodeSelectionContext);
  const settingsButtonRef = React.useRef<HTMLSpanElement>(null);
  const deleteButtonRef = React.useRef<HTMLSpanElement>(null);
  const isSelected = selectedPath ? sameArray(path, selectedPath) : false;

  const isLeafNode = typeof uiChildren === undefined;
  const dragAndDropCallbacks = useDragAndDropElements(path, isLeafNode);

  const handleHoverOver = (e: React.MouseEvent) => {
    e.stopPropagation();
    settingsButtonRef.current?.classList.add(classes.selected);
    deleteButtonRef.current?.classList.add(classes.selected);
  };

  const handleHoverOff = (e: React.MouseEvent) => {
    e.stopPropagation();
    settingsButtonRef.current?.classList.remove(classes.selected);
    deleteButtonRef.current?.classList.remove(classes.selected);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodeSelection(path);
  };

  const Comp = uiComponentAndSettings[uiName].UiComponent as UiNodeComponent<
    typeof uiArguments
  >;

  return (
    <Comp
      uiArguments={uiArguments}
      {...dragAndDropCallbacks}
      onMouseOver={handleHoverOver}
      onMouseLeave={handleHoverOff}
      onClick={handleDoubleClick}
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
