import React from "react";

import { DraggedNodeInfo } from "./DragAndDropHelpers";

export type DraggedNodeState = [
  DraggedNodeInfo | null,
  (path: DraggedNodeInfo | null) => void
];

const DraggedNodeContext = React.createContext<DraggedNodeState>([
  null,
  (x) => {},
]);

export const CurrentDraggedNodeProvider: React.FC = ({ children }) => {
  const draggedNodeState = React.useState<DraggedNodeInfo | null>(null);

  return (
    <DraggedNodeContext.Provider value={draggedNodeState}>
      {children}
    </DraggedNodeContext.Provider>
  );
};

export function useCurrentDraggedNode() {
  return React.useContext(DraggedNodeContext)[0];
}

/**
 *
 * @param info Information about the node and potentially its current path to
 * attach to the drag event.
 * @returns A callback appropriate for the onDragStart event
 */
export function useSetCurrentDraggedNode(nodeInfo: DraggedNodeInfo) {
  const [, setDraggedNode] = React.useContext(DraggedNodeContext);

  return function (e: React.DragEvent<HTMLElement>) {
    e.stopPropagation();
    setDraggedNode(nodeInfo);
    // assignElementDragData(e, nodeInfo);
  };
}
