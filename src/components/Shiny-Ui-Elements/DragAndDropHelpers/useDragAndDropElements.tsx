import React from "react";
import { defaultSettingsForElements } from "../Elements/uiComponentAndSettings";
import { NodePath, ShinyUiNames } from "../uiNodeTypes";
import NodeUpdateContext from "../UiNode/NodeUpdateContext";
import classes from "./DragAndDrop.module.css";

export type DragAndDropTargetEvents =
  | "onDrop"
  | "onDragEnter"
  | "onDragOver"
  | "onDragLeave";

export const dragAndDropTargetEvents: DragAndDropTargetEvents[] = [
  "onDrop",
  "onDragEnter",
  "onDragOver",
  "onDragLeave",
];

export type DragAndDropHandlers = Pick<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  DragAndDropTargetEvents
>;

export function useDragAndDropElements(path: NodePath, isLeafNode: boolean) {
  const nodeUpdaters = React.useContext(NodeUpdateContext);

  const callbacks = React.useMemo(
    () =>
      isLeafNode
        ? {}
        : {
            onDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
              e.preventDefault();
              // Update styles to indicate the user can drop item here
              highlightDropability(e);
            },

            onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
              e.preventDefault();
              // This callback just needs to be here and prevent the default
              // otherwise the onDrop event won't fire
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
              nodeUpdaters({
                type: "ADD_NODE",
                parentPath: path,
                newNode: newElement,
              });

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
