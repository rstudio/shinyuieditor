import React from "react";

import { useDispatch } from "react-redux";

import type { TemplatedGridProps } from "../Shiny-Ui-Elements/GridlayoutGridPage";
import type { NodePath } from "../Shiny-Ui-Elements/uiNodeTypes";

import { UPDATE_NODE } from "./uiTree";

export function useUpdateUiArguments(path: NodePath) {
  const dispatch = useDispatch();

  const updateArguments = React.useCallback(
    (newArguments: TemplatedGridProps) => {
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
