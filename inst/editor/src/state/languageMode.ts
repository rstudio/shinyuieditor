import { useSelector } from "react-redux";

import type { RootState } from "./store";

export const useLanguageMode = () => {
  const app_info = useSelector((state: RootState) => state.app_info);

  if (app_info.mode === "MAIN") {
    return app_info.language;
  }

  return "R";
};
