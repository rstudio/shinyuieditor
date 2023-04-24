import React from "react";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Language_Mode } from "communication-types/src/AppInfo";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "./store";

export const useLanguageMode = () => {
  const app_info = useSelector((state: RootState) => state.app_info);

  if (app_info.mode === "MAIN") {
    return app_info.language;
  }

  return "R";
};
