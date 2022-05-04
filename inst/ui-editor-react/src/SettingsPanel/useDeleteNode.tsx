import * as React from "react";

import type { NodePath } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { useDispatch } from "react-redux";
import { DELETE_NODE } from "state/uiTree";

export function useDeleteNode(pathToNode: NodePath) {
  const dispatch = useDispatch();

  const deleteNode = React.useCallback(() => {
    dispatch(DELETE_NODE({ path: pathToNode }));
  }, [dispatch, pathToNode]);

  return deleteNode;
}
