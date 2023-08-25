import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { MessageToClientByPath } from "communication-types";
import type { AppInfo } from "communication-types/src/AppInfo";
import { useSelector } from "react-redux";

import type { TemplateChooserOptions } from "../components/TemplatePreviews/TemplateChooserView";
import type { ShinyUiNode } from "../ui-node-definitions/ShinyUiNode";
import type { PlaceNodeArguments } from "../ui-node-definitions/TreeManipulation/placeNode";
import { placeNodeMutating } from "../ui-node-definitions/TreeManipulation/placeNode";
import type { RemoveNodeArguments } from "../ui-node-definitions/TreeManipulation/removeNode";
import { removeNodeMutating } from "../ui-node-definitions/TreeManipulation/removeNode";
import type { UpdateNodeArguments } from "../ui-node-definitions/TreeManipulation/updateNode";
import { updateNodeMutating } from "../ui-node-definitions/TreeManipulation/updateNode";

import {
  get_deletion_subscriptions,
  get_update_subscriptions,
} from "./create_subscriber_getter";
import type { RootState } from "./store";

export type EditingState = {
  mode: "MAIN";
} & AppInfo;

export type ErrorState = {
  mode: "ERROR";
  /** Where this error occured. E.g. "Parsing ast" */
  context: string;
  /** Error message from error */
  msg: string;
};

export type MainStateOption =
  | EditingState
  | {
      mode: "TEMPLATE_CHOOSER";
      options: TemplateChooserOptions;
    }
  | {
      mode: "LOADING";
    }
  | {
      mode: "CONNECTION-LOST";
    }
  | ErrorState;

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
    SET_APP_INFO: (state, action: PayloadAction<AppInfo>) => {
      try {
        return {
          ...state,
          mode: "MAIN",
          ...action.payload,
        };
      } catch (error) {
        const error_msg = error instanceof Error ? error.message : null;

        if (error_msg === null) {
          // eslint-disable-next-line no-console
          console.error("Unknown error type seen", error);
        }
        return {
          ...state,
          mode: "ERROR",
          msg: error_msg ?? "Unknown error",
          context: "Parsing app information from backend",
        };
      }
    },
    SET_ERROR: (
      state,
      { payload }: PayloadAction<MessageToClientByPath["BACKEND-ERROR"]>
    ) => {
      return { ...state, mode: "ERROR", ...payload };
    },
    SHOW_TEMPLATE_CHOOSER: (
      state,
      { payload }: PayloadAction<TemplateChooserOptions>
    ) => {
      return { ...state, mode: "TEMPLATE_CHOOSER", options: payload };
      // console.log("Template chooser mode", mode);
      // return "TEMPLATE_CHOOSER";
    },
    SET_LOADING: (state) => {
      return { ...state, mode: "LOADING" };
    },
    SET_CONNECTION_LOST: (state) => {
      return { ...state, mode: "CONNECTION-LOST" };
    },
    UPDATE_NODE: (state, action: PayloadAction<UpdateNodeArguments>) => {
      if (state.mode !== "MAIN") {
        throw new Error("Tried to update a node when in template chooser mode");
      }

      // Make sure the tree is valid here
      for (const subscription of get_update_subscriptions()) {
        subscription(state.ui_tree, action.payload);
      }
      updateNodeMutating(state.ui_tree, action.payload);
    },
    PLACE_NODE: (state, action: PayloadAction<PlaceNodeArguments>) => {
      if (state.mode !== "MAIN") {
        throw new Error("Tried to move a node when in template chooser mode");
      }
      placeNodeMutating(state.ui_tree, action.payload);
    },
    DELETE_NODE: (state, action: PayloadAction<RemoveNodeArguments>) => {
      if (state.mode !== "MAIN") {
        throw new Error("Tried to delete a node when in template chooser mode");
      }
      for (const subscription of get_deletion_subscriptions()) {
        subscription(state.ui_tree, { path: action.payload.path });
      }
      removeNodeMutating(state.ui_tree, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  UPDATE_NODE,
  PLACE_NODE,
  DELETE_NODE,
  SET_APP_INFO,
  SET_ERROR,
  SET_FULL_STATE,
  SHOW_TEMPLATE_CHOOSER,
  SET_LOADING,
  SET_CONNECTION_LOST,
} = mainStateSlice.actions;

export type UpdateAction = (
  tree: ShinyUiNode,
  payload: UpdateNodeArguments
) => void;
export type DeleteAction = (
  tree: ShinyUiNode,
  payload: RemoveNodeArguments
) => void;

export function useCurrentAppInfo() {
  return useSelector((state: RootState) => state.app_info);
}

export default mainStateSlice.reducer;
