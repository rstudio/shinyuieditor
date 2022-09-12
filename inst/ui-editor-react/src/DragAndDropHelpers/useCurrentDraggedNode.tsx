import React from "react";

import type { DraggedNodeInfo } from "./DragAndDropHelpers";

export type DraggedNodeState = [
  DraggedNodeInfo | null,
  (path: DraggedNodeInfo | null) => void
];

export const DraggedNodeContext = React.createContext<DraggedNodeState>([
  null,
  (x) => {},
]);

export function CurrentDraggedNodeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const draggedNodeState = React.useState<DraggedNodeInfo | null>(null);

  return (
    <DraggedNodeContext.Provider value={draggedNodeState}>
      {children}
    </DraggedNodeContext.Provider>
  );
}

export function useCurrentDraggedNode() {
  return React.useContext(DraggedNodeContext);
}
