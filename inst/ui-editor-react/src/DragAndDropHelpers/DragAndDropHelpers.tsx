import type React from "react";

import type {
  NodePath,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";

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
