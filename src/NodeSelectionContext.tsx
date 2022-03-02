import * as React from "react";

import { NodePath } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";

export type NodeSelectionState = [
  NodePath | null,
  (path: NodePath | null) => void
];

export const NodeSelectionContext = React.createContext<NodeSelectionState>([
  null,
  (path: NodePath | null) => console.log(`Selected node placeholder`, path),
]);
