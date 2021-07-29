import layouts from "./layouts";
import { GridLayoutTemplate } from "./types";

export type LayoutUpdateActions =
  | {
      type: "New-Template";
      name: string;
    }
  | {
      type: "Change-Gap";
      gap: string;
    };
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
    case "New-Template":
      return layouts.find((l) => l.name === action.name) ?? currentLayout;
    default:
      throw new Error("Unexpected action");
  }
};
