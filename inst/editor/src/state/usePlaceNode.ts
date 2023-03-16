import React from "react";

import { useDispatch } from "react-redux";

import type { PlaceNodeArguments } from "../components/UiNode/TreeManipulation/placeNode";
import type { Wrapping_Node } from "../components/UiNode/TreeManipulation/wrapInNode";
import { wrapInNode } from "../components/UiNode/TreeManipulation/wrapInNode";

import { PLACE_NODE } from "./app_info";

export function usePlaceNode() {
  const dispatch = useDispatch();

  const place_node = React.useCallback(
    ({
      wrappingNode,
      node,
      ...opts
    }: PlaceNodeArguments & {
      wrappingNode?: Wrapping_Node;
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
