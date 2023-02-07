import * as React from "react";

import { useDispatch, useSelector } from "react-redux";

import type { NodePath } from "./Shiny-Ui-Elements/uiNodeTypes";
import { SET_SELECTION } from "./state/selectedPath";
import type { RootState } from "./state/store";

type NodeSelectionState = [NodePath | null, (path: NodePath | null) => void];

export function useNodeSelectionState(): NodeSelectionState {
  const dispatch = useDispatch();

  const selectedPath = useSelector((state: RootState) => state.selected_path);
  const setSelectedPath = React.useCallback(
    (path: NodePath | null) => {
      dispatch(SET_SELECTION({ path }));
    },
    [dispatch]
  );

  return [selectedPath, setSelectedPath];
}

export function useSelectedPath() {
  const selectedPath = useSelector((state: RootState) => state.selected_path);

  return selectedPath;
}
