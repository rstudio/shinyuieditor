import React from "react";

import { useDispatch } from "react-redux";

import { UPDATE_NODE } from "../../../state/app_info";
import type { NodePath } from "../../uiNodeTypes";

import type { GridLayoutArgs } from "./GridContainerElement/GridLayoutArgs";

export function useUpdateNamedArgs(path: NodePath) {
  const dispatch = useDispatch();

  const updateArguments = React.useCallback(
    (newArguments: GridLayoutArgs) => {
      dispatch(
        UPDATE_NODE({
          path: path,
          node: {
            namedArgs: newArguments,
          },
        })
      );
    },
    [dispatch, path]
  );

  return updateArguments;
}
