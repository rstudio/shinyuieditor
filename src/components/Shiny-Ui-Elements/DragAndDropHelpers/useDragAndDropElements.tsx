import React from "react";
import { sendTreeUpdateMessage } from "../Elements/treeUpdateEvents";
import { defaultSettingsForElements } from "../Elements/uiComponentAndSettings";
import { NodePath, ShinyUiNames } from "../uiNodeTypes";
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

export function buildDragAndDropHandlers(
  onDrop: (nameOfDropped: ShinyUiNames) => void
) {
  return {
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
      console.log("Highlight on drag enter!");
      e.preventDefault();
      // Update styles to indicate the user can drop item here
      highlightDropability(e);
    },
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      removeHighlight(e);
    },
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      // This callback just needs to be here and prevent the default
      // otherwise the onDrop event won't fire
    },
    onDrop: (e: React.DragEvent<HTMLDivElement>) => {
      // Make sure only the deepest container gets the drop event
      e.stopPropagation();

      removeHighlight(e);

      // Get the type of dropped element and act on it
      const nameOfDroppedUi = e.dataTransfer.getData(
        "element-type"
      ) as ShinyUiNames;

      if (!nameOfDroppedUi) {
        throw new Error(
          "Could not find default settings for node of type " + nameOfDroppedUi
        );
      }

      onDrop(nameOfDroppedUi);
    },
  };
}

export function useDragAndDropElements(path: NodePath, isLeafNode: boolean) {
  const callbacks = React.useMemo(
    () =>
      isLeafNode
        ? {}
        : buildDragAndDropHandlers((nameOfDroppedUi) => {
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
            sendTreeUpdateMessage({
              type: "ADD_NODE",
              parentPath: path,
              newNode: newElement,
            });
          }),
    [isLeafNode, path]
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
