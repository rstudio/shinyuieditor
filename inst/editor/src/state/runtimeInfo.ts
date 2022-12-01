import React from "react";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RuntimeType } from "communication-types";
import { useDispatch, useSelector } from "react-redux";

import { useBackendCallbacks } from "../backendCommunication/useBackendMessageCallbacks";

import type { RootState } from "./store";

export const runtimeInfoSlice = createSlice({
  name: "runtimeInfo",
  initialState: "HTTPUV" as RuntimeType,
  reducers: {
    SET_RUNTIME: (_prev, action: PayloadAction<RuntimeType>) => action.payload,
  },
});

// Action creators are generated for each case reducer function
const { SET_RUNTIME } = runtimeInfoSlice.actions;

export const useRuntimeType = () => {
  const runtimeInfo = useSelector((state: RootState) => state.runtimeInfo);
  return runtimeInfo;
};

export const useListenForRuntimeType = () => {
  const { incomingMsgs } = useBackendCallbacks();

  const dispatch = useDispatch();

  React.useEffect(() => {
    const listenForRuntimeTypeMsg = incomingMsgs.subscribe(
      "RUNTIME-TYPE",
      (type) => {
        dispatch(SET_RUNTIME(type));
      }
    );

    return () => {
      listenForRuntimeTypeMsg.unsubscribe();
    };
  }, [dispatch, incomingMsgs]);
};

export default runtimeInfoSlice.reducer;
