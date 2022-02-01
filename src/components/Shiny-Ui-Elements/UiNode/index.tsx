import React from "react";
import { FiTrash as TrashIcon } from "react-icons/fi";
import { sameArray } from "utils/equalityCheckers";
import {
  uiComponentAndSettings,
  UiNodeComponent,
} from "../Elements/uiComponentAndSettings";
import { checkIfContainerNode, NodePath, UiNodeProps } from "../uiNodeTypes";
import NodeUpdateContext from "./NodeUpdateContext";
import classes from "./styles.module.css";
import { useDragAndDropElements } from "./useDragAndDropElements";

/**
 * Recursively render the nodes in a UI Tree
 */

const UiNode = ({
  path = [],
  selectedPath,
  ...props
}: { path?: NodePath; selectedPath: NodePath | null } & UiNodeProps) => {
  const nodeUpdaters = React.useContext(NodeUpdateContext);

  const settingsButtonRef = React.useRef<HTMLSpanElement>(null);
  const deleteButtonRef = React.useRef<HTMLSpanElement>(null);
  const isSelected = selectedPath ? sameArray(path, selectedPath) : false;

  const controls = (
    <>
      <span
        style={{ position: "absolute" }}
        className={classes.deleteButton}
        onClick={() => {
          nodeUpdaters.deleteNode(path);
        }}
        ref={deleteButtonRef}
      >
        <TrashIcon />
      </span>
    </>
  );

  const { uiName, uiArguments, uiChildren } = props;
  const dragAndDropCallbacks = useDragAndDropElements(
    path,
    !checkIfContainerNode(props)
  );

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
    nodeUpdaters.selectNode(path);
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
      onDoubleClick={handleDoubleClick}
    >
      {uiChildren?.map((childNode, i) => (
        <UiNode
          key={path.join(".") + i}
          path={[...path, i]}
          selectedPath={selectedPath}
          {...childNode}
        />
      ))}
      {controls}
      {isSelected ? <div className={classes.selectedOverlay} /> : null}
    </Comp>
  );
};

export default UiNode;
