import { CSSMeasure, GridLayoutTemplate, TractValue } from "./types";

type LayoutUpdateActions =
  | {
      type: "Change-Gap";
      gap: string;
    }
  | {
      type: "Change-Tract";
      value: TractValue;
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
    case "Change-Tract":
      const newLayout = { ...currentLayout };
      newLayout[action.value.dir][action.value.index] = action.value.val;
      return newLayout;
    default:
      throw new Error("Unexpected action");
  }
};
