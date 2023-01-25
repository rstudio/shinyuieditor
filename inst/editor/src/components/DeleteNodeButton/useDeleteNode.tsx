import * as React from "react";

import { useDispatch } from "react-redux";

import type { NodePath } from "../../Shiny-Ui-Elements/uiNodeTypes";
import { DELETE_NODE } from "../../state/uiTree";

/**
 * Generates a callback for deleting the node pointed to at given path and also
 *
 * @param pathToNode Path the a node to be deleted.
 * @returns callback for deleting the node at `pathToNode` in current ui tree
 */
export function useDeleteNode(pathToNode: NodePath | null) {
  const dispatch = useDispatch();

  const deleteNode = React.useCallback(() => {
    if (pathToNode === null) return;

    dispatch(DELETE_NODE({ path: pathToNode }));
  }, [dispatch, pathToNode]);

  return deleteNode;
}
