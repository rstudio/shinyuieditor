import React from "react";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "components/Shiny-Ui-Elements/uiNodeTypes";
import type { PlaceNodeArguments } from "components/UiNode/TreeManipulation/placeNode";
import { placeNodeMutating } from "components/UiNode/TreeManipulation/placeNode";
import type { RemoveNodeArguments } from "components/UiNode/TreeManipulation/removeNode";
import { removeNodeMutating } from "components/UiNode/TreeManipulation/removeNode";
import type { UpdateNodeArguments } from "components/UiNode/TreeManipulation/updateNode";
import { updateNodeMutating } from "components/UiNode/TreeManipulation/updateNode";
import { useDispatch } from "react-redux";

export const initialUiTree: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    areas: [["msg"]],
    row_sizes: ["1fr"],
    col_sizes: ["1fr"],
    gap_size: "1rem",
  },
  uiChildren: [
    {
      uiName: "gridlayout::grid_card_text",
      uiArguments: {
        area: "msg",
        content: "Loading App...",
        alignment: "center",
      },
    },
  ],
};

// Note: The reducer callbacks use immer so the mutations we make to the object
// are safe and we just make the needed mutations to the tree object and don't
// return anything
export const uiTreeSlice = createSlice({
  name: "uiTree",
  initialState: initialUiTree as ShinyUiNode,
  reducers: {
    // This is used to teleport to a given state wholesale. E.g. undo-redo
    SET_FULL_STATE: (tree, action: PayloadAction<{ state: ShinyUiNode }>) =>
      action.payload.state,
    // This will initialize a state while also making sure the arguments match
    // what we expect in the app
    INIT_STATE: (tree, action: PayloadAction<{ initialState: ShinyUiNode }>) =>
      fillInDefaultValues(action.payload.initialState),
    UPDATE_NODE: (tree, action: PayloadAction<UpdateNodeArguments>) => {
      updateNodeMutating(tree, action.payload);
    },
    PLACE_NODE: (tree, action: PayloadAction<PlaceNodeArguments>) => {
      placeNodeMutating(tree, action.payload);
    },
    DELETE_NODE: (tree, action: PayloadAction<RemoveNodeArguments>) => {
      removeNodeMutating(tree, action.payload);
    },
  },
});

/**
 *
 * @param uiTree Shiny Ui Tree
 * @returns The ui tree modified by adding default values of any ommitted
 * properties with default values.
 *
 * It's not terribly clear if this is a good idea or not as it will immediately
 * mess with the user's code but will eliminate confusion when the settings
 * options controls don't actually match the presented values
 */
function fillInDefaultValues(uiTree: ShinyUiNode): ShinyUiNode {
  const { uiName, uiArguments, uiChildren } = uiTree;

  const defaultSettingsForNode = shinyUiNodeInfo[uiName].defaultSettings;

  const newUiArguments = { ...defaultSettingsForNode, ...uiArguments };

  const newUiChildren = uiChildren
    ? uiChildren.map((childNode) => fillInDefaultValues(childNode))
    : undefined;

  return {
    uiName,
    uiArguments: newUiArguments,
    uiChildren: newUiChildren,
  } as ShinyUiNode;
}

// Action creators are generated for each case reducer function
export const {
  UPDATE_NODE,
  PLACE_NODE,
  DELETE_NODE,
  INIT_STATE,
  SET_FULL_STATE,
} = uiTreeSlice.actions;

export type UpdateAction = (
  tree: ShinyUiNode,
  payload: UpdateNodeArguments
) => void;
export type DeleteAction = (
  tree: ShinyUiNode,
  payload: RemoveNodeArguments
) => void;

export function usePlaceNode() {
  const dispatch = useDispatch();

  const place_node = React.useCallback(
    (opts: PlaceNodeArguments) => {
      dispatch(PLACE_NODE(opts));
    },
    [dispatch]
  );

  return place_node;
}

export default uiTreeSlice.reducer;
