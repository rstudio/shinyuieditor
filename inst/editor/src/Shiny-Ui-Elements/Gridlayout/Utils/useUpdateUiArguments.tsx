import React from "react";

import { useDispatch } from "react-redux";

import { UPDATE_NODE } from "../../../state/app_info";
import type { GridLayoutArgs } from "../../../ui-node-definitions/gridlayout/GridLayoutArgs";
import type { NodePath } from "../../../ui-node-definitions/NodePath";

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
