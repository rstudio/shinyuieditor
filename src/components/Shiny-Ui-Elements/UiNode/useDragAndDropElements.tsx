import React from "react";
import { NodePath, ShinyUiNames } from "../uiNodeTypes";
import { defaultSettingsForElements } from "../Elements/uiComponentAndSettings";
import { NodeUpdateContext } from "../UiTree";
import classes from "./styles.module.css";

export function useDragAndDropElements(path: NodePath, isLeafNode: boolean) {
  const nodeUpdaters = React.useContext(NodeUpdateContext);

  const callbacks = React.useMemo(
    () =>
      isLeafNode
        ? {}
        : {
            onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
              e.preventDefault();
              // Update styles to indicate the user can drop item here
              highlightDropability(e);
            },

            onDragLeave: (e: React.DragEvent<HTMLDivElement>) => {
              e.preventDefault();
              removeHighlight(e);
            },

            onDrop: (e: React.DragEvent<HTMLDivElement>) => {
              // Make sure only the deepest container gets the drop event
              e.stopPropagation();

              // Get the type of dropped element and act on it
              const nameOfDroppedUi = e.dataTransfer.getData(
                "element-type"
              ) as ShinyUiNames;

              // For right now we'll just use the default settings for the
              // dropped ui element
              const newElement = defaultSettingsForElements.find(
                ({ uiName }) => uiName === nameOfDroppedUi
              );

              if (!newElement) {
                throw new Error(
                  "Could not find default settings for node of type " +
                    nameOfDroppedUi
                );
              }

              // Let the state know we have a new child node
              nodeUpdaters.addNode(path, newElement);

              removeHighlight(e);
            },
          },
    [isLeafNode, nodeUpdaters, path]
  );

  return callbacks;
}
function highlightDropability(e: React.DragEvent<HTMLDivElement>) {
  if (e.currentTarget === e.target) {
    e.currentTarget.classList.add(classes.canDrop);
  }
}
function removeHighlight(e: React.DragEvent<HTMLDivElement>) {
  e.currentTarget.classList.remove(classes.canDrop);
}
