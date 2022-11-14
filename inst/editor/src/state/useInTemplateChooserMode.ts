import { useSelector } from "react-redux";

import type { RootState } from "./store";

export function useInTemplateChooserMode() {
  const tree = useSelector((state: RootState) => state.uiTree);

  return tree === "TEMPLATE_CHOOSER";
}
