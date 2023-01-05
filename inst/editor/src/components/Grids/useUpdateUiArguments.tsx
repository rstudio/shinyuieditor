import React from "react";

import { useDispatch } from "react-redux";

import type { NodePath } from "../../Shiny-Ui-Elements/uiNodeTypes";
import { UPDATE_NODE } from "../../state/uiTree";
import type { GridLayoutArgs } from "../GridlayoutElement/GridLayoutArgs";

export function useUpdateUiArguments(path: NodePath) {
  const dispatch = useDispatch();

  const updateArguments = React.useCallback(
    (newArguments: GridLayoutArgs) => {
      dispatch(
        UPDATE_NODE({
          path: path,
          node: {
            uiArguments: newArguments,
          },
        })
      );
    },
    [dispatch, path]
  );

  return updateArguments;
}