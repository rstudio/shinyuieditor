import React from "react";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { getDefaultSettings } from "../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import type { TemplateChooserOptions } from "../components/TemplatePreviews/TemplateChooserView";
import type { PlaceNodeArguments } from "../components/UiNode/TreeManipulation/placeNode";
import { placeNodeMutating } from "../components/UiNode/TreeManipulation/placeNode";
import type { RemoveNodeArguments } from "../components/UiNode/TreeManipulation/removeNode";
import { removeNodeMutating } from "../components/UiNode/TreeManipulation/removeNode";
import type { UpdateNodeArguments } from "../components/UiNode/TreeManipulation/updateNode";
import { updateNodeMutating } from "../components/UiNode/TreeManipulation/updateNode";
import type { ShinyUiNode } from "../main";
import { isShinyUiNode } from "../Shiny-Ui-Elements/isShinyUiNode";
import { shinyUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";
import { subtractElements } from "../utils/array-helpers";

import type { RootState } from "./store";
import {
  deleteSubscriptions,
  updateSubscriptions,
} from "./watcherSubscriptions";

export type MainStateOption =
  | {
      mode: "MAIN";
      uiTree: ShinyUiNode;
    }
  | {
      mode: "TEMPLATE_CHOOSER";
      options: TemplateChooserOptions;
    }
  | {
      mode: "LOADING";
    };

// Note: The reducer callbacks use immer so the mutations we make to the object
// are safe and we just make the needed mutations to the tree object and don't
// return anything
export const mainStateSlice = createSlice({
  name: "state",
  initialState: {
    mode: "LOADING",
  } as MainStateOption,
  reducers: {
    // This is used to teleport to a given state wholesale. E.g. undo-redo
    SET_FULL_STATE: (tree, action: PayloadAction<{ state: MainStateOption }>) =>
      action.payload.state,
    // This will initialize a state while also making sure the arguments match
    // what we expect in the app
    SET_UI_TREE: (tree, action: PayloadAction<{ uiTree: ShinyUiNode }>) => {
      return { mode: "MAIN", uiTree: action.payload.uiTree };
    },
    SHOW_TEMPLATE_CHOOSER: (
      state,
      { payload }: PayloadAction<TemplateChooserOptions>
    ) => {
      return { mode: "TEMPLATE_CHOOSER", options: payload };
      // console.log("Template chooser mode", mode);
      // return "TEMPLATE_CHOOSER";
    },
    SET_LOADING: (state) => {
      return { mode: "LOADING" };
    },
    UPDATE_NODE: (state, action: PayloadAction<UpdateNodeArguments>) => {
      if (state.mode !== "MAIN") {
        throw new Error("Tried to update a node when in template chooser mode");
      }

      // Make sure the tree is valid here
      for (const subscription of updateSubscriptions) {
        subscription(state.uiTree, action.payload);
      }
      updateNodeMutating(state.uiTree, action.payload);
    },
    PLACE_NODE: (state, action: PayloadAction<PlaceNodeArguments>) => {
      if (state.mode !== "MAIN") {
        throw new Error("Tried to move a node when in template chooser mode");
      }
      placeNodeMutating(state.uiTree, action.payload);
    },
    DELETE_NODE: (state, action: PayloadAction<RemoveNodeArguments>) => {
      if (state.mode !== "MAIN") {
        throw new Error("Tried to delete a node when in template chooser mode");
      }
      for (const subscription of deleteSubscriptions) {
        subscription(state.uiTree, { path: action.payload.path });
      }
      removeNodeMutating(state.uiTree, action.payload);
    },
  },
});

/**
 *
 * @param uiNode Shiny Ui Tree
 * @returns The ui tree modified by adding default values of any ommitted
 * properties with default values.
 *
 * It's not terribly clear if this is a good idea or not as it will immediately
 * mess with the user's code but will eliminate confusion when the settings
 * options controls don't actually match the presented values
 */
function fillInDefaultValues(uiNode: ShinyUiNode) {
  if (!isShinyUiNode(uiNode)) return uiNode;

  const defaultSettingsForNode = getDefaultSettings(
    shinyUiNodeInfo[uiNode.uiName].settingsInfo,
    uiNode
  );

  const argsInNode = Object.keys(uiNode.uiArguments);
  const defaultNodeArgs = Object.keys(defaultSettingsForNode);
  const missingArgs = subtractElements(defaultNodeArgs, argsInNode);

  // Only mess with the ui arguments if there's a discrepency in present
  // arguments and required/default ones
  if (missingArgs.length > 0) {
    uiNode.uiArguments = { ...defaultSettingsForNode, ...uiNode.uiArguments };
  }

  // Recurse over all the children so entire tree is checked
  if (uiNode.uiChildren) {
    uiNode.uiChildren.forEach((childNode) => fillInDefaultValues(childNode));
  }

  // Return the ui node so the state knows it can update
  return uiNode as ShinyUiNode;
}

// Action creators are generated for each case reducer function
export const {
  UPDATE_NODE,
  PLACE_NODE,
  DELETE_NODE,
  SET_UI_TREE,
  SET_FULL_STATE,
  SHOW_TEMPLATE_CHOOSER,
  SET_LOADING,
} = mainStateSlice.actions;

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

export function useCurrentUiTree() {
  return useSelector((state: RootState) => state.uiTree);
}

export default mainStateSlice.reducer;