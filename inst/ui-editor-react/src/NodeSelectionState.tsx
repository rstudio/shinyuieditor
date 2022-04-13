import * as React from "react";

import type { NodePath } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTION } from "state/selectedPath";
import type { RootState } from "state/store";

export type NodeSelectionState = [
  NodePath | null,
  (path: NodePath | null) => void
];

export function useNodeSelectionState(): NodeSelectionState {
  const dispatch = useDispatch();

  const selectedPath = useSelector((state: RootState) => state.selectedPath);
  const setSelectedPath = React.useCallback(
    (path: NodePath | null) => {
      dispatch(SET_SELECTION({ path }));
    },
    [dispatch]
  );

  return [selectedPath, setSelectedPath];
}
