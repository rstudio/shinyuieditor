import * as React from "react";

import { useDispatch } from "react-redux";

import type { NodePath } from "../../Shiny-Ui-Elements/uiNodeTypes";
import { DELETE_NODE } from "../../state/uiTree";

export function useDeleteNode(pathToNode: NodePath | null) {
  const dispatch = useDispatch();

  const deleteNode = React.useCallback(() => {
    if (pathToNode === null) return;

    dispatch(DELETE_NODE({ path: pathToNode }));
  }, [dispatch, pathToNode]);

  return deleteNode;
}
