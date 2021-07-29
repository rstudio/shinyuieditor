import { GridLayoutTemplate } from "./types";

type LayoutUpdateActions = {
  type: "Change-Gap";
  gap: string;
};
export type LayoutUpdateDispatch = (a: LayoutUpdateActions) => void;
export const layoutUpdater = (
  currentLayout: GridLayoutTemplate,
  action: LayoutUpdateActions
) => {
  switch (action.type) {
    case "Change-Gap":
      return {
        ...currentLayout,
        gap: action.gap,
      };
    default:
      throw new Error("Unexpected action");
  }
};
