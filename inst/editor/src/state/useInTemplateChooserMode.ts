import { useSelector } from "react-redux";

import type { RootState } from "./store";

export function useInTemplateChooserMode() {
  const state = useSelector((state: RootState) => state.uiTree);

  return state.mode === "TEMPLATE_CHOOSER";
}
