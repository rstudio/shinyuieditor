import type React from "react";

import type {
  NodePath,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";

import classes from "./DragAndDrop.module.css";

type DragAndDropTargetEvents =
  | "onDrop"
  | "onDragEnter"
  | "onDragOver"
  | "onDragLeave";

export type DropHandlers = Pick<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  DragAndDropTargetEvents
>;

export type DraggedNodeInfo = { node: ShinyUiNode; currentPath?: NodePath };

export function highlightDropAvailability(el: HTMLElement) {
  el.classList.add(classes.availableForDrop);
}

export function highlightDropability(
  e: DragEvent | React.DragEvent<HTMLDivElement>
) {
  if (!e.currentTarget) return;
  if (e.currentTarget === e.target) {
    (e.currentTarget as HTMLElement).classList.add(classes.canDrop);
  }
}

export function removeHighlight(
  e: DragEvent | React.DragEvent<HTMLDivElement>
) {
  if (!e.currentTarget) return;

  const el = e.currentTarget as HTMLElement;
  el.classList.remove(classes.canDrop);
}

export function resetHighlights(el: HTMLElement) {
  el.classList.remove(classes.canDrop);
  el.classList.remove(classes.availableForDrop);
}
