import * as React from "react";

import type { NodePath } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";

export type NodeSelectionState = [
  NodePath | null,
  (path: NodePath | null) => void
];

const NodeSelectionContext = React.createContext<NodeSelectionState>([
  null,
  (path: NodePath | null) => console.log(`Selected node placeholder`, path),
]);

export const NodeSelectionProvider: React.FC<{
  selectionState: NodeSelectionState;
}> = ({ children, selectionState }) => {
  return (
    <NodeSelectionContext.Provider value={selectionState}>
      {children}
    </NodeSelectionContext.Provider>
  );
};

export function useNodeSelectionState() {
  return React.useContext(NodeSelectionContext);
}
