import * as React from "react";

import { useDispatch } from "react-redux";

import type { ShinyUiRootNode } from "../Shiny-Ui-Elements/uiNodeTypes";

import { INIT_STATE } from "./uiTree";

export function useSetTree() {
  const dispatch = useDispatch();
  const setTree = React.useCallback(
    (newTree: ShinyUiRootNode) => {
      dispatch(INIT_STATE({ initialState: newTree }));
    },
    [dispatch]
  );

  return setTree;
}
