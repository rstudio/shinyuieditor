import { useMakeDraggable } from "../../DragAndDropHelpers/useMakeDraggable";
import { pathToString } from "../../ui-node-definitions/utils/nodePathUtils";

import type { UiNodeProps } from "./UiNode";
import { usePathInformation } from "./usePathInformation";

/**
 * Optional props that will enable drag behavior on a given ui node. Non
 * draggable nodes will simple get an empty object.
 */
type DragPassthroughEvents =
  | {
      onDragStart: React.DragEventHandler<HTMLDivElement>;
      onDragEnd: (e: React.DragEvent<HTMLDivElement> | DragEvent) => void;
      /**
       * Should this node be allowed to be dragged out of its parent node? This
       * would be set to false for a container that typically always stays wrapped
       * around a single child where almost every time the user wants to move the
       * child they want the container to move with it. E.g. a grid panel with a
       * single element in it
       */
      draggable: boolean;
    }
  | {};

/**
 * Bundle of props that will get passed through to every ui node. These are to
 * be destructured into the top level of the ui component and enable things like
 * selection on click as well as attaching some data attributes to enable the ui
 * element component to interact with the rest of the app properly.
 */
export type UiNodeWrapperProps = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  "data-sue-path": string;
  "data-is-selected-node": boolean;
  "aria-label": string;
} & DragPassthroughEvents;

export function useMakeWrapperProps({
  node,
  path,
  canDrag,
}: UiNodeProps): UiNodeWrapperProps {
  const dragProps = useMakeDraggable({ node, currentPath: path });

  const { onClick, isSelected } = usePathInformation(path);

  return {
    onClick,
    "data-sue-path": pathToString(path),
    "data-is-selected-node": isSelected,
    "aria-label": node.id,
    ...(canDrag ? dragProps : {}),
  };
}
