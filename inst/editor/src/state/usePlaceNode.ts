import React from "react";

import { useDispatch } from "react-redux";
import type { PlaceNodeArguments } from "ui-node-definitions/src/TreeManipulation/placeNode";
import type { WrappingNode } from "ui-node-definitions/src/TreeManipulation/wrapInNode";
import { wrapInNode } from "ui-node-definitions/src/TreeManipulation/wrapInNode";

import { PLACE_NODE } from "./app_info";

export function usePlaceNode() {
  const dispatch = useDispatch();

  const place_node = React.useCallback(
    ({
      wrappingNode,
      node,
      ...opts
    }: PlaceNodeArguments & {
      wrappingNode?: WrappingNode;
    }) => {
      if (wrappingNode) {
        node = wrapInNode({ child: node, wrapper: wrappingNode });
      }

      dispatch(PLACE_NODE({ node, ...opts }));
    },
    [dispatch]
  );

  return place_node;
}
