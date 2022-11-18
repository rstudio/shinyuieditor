import React from "react";

import { useDispatch } from "react-redux";

import type { TemplatedGridProps } from "../../components/Grids/EditableGridContainer/TemplatedGridProps";
import type { NodePath } from "../../Shiny-Ui-Elements/uiNodeTypes";
import { UPDATE_NODE } from "../../state/uiTree";
import { convertTemplatedLayoutToGridlayoutArgs } from "../GridlayoutElement/layoutParsing";

export function useUpdateUiArguments(path: NodePath) {
  const dispatch = useDispatch();

  const updateArguments = React.useCallback(
    (newArguments: TemplatedGridProps) => {
      dispatch(
        UPDATE_NODE({
          path: path,
          node: {
            uiArguments: convertTemplatedLayoutToGridlayoutArgs(newArguments),
          },
        })
      );
    },
    [dispatch, path]
  );

  return updateArguments;
}
