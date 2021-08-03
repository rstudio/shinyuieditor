import { GridLayoutTemplate, ItemTractPos, TractValue } from "../types";

type LayoutUpdateActions =
  | {
      type: "Change-Gap";
      gap: string;
    }
  | ({
      type: "Change-Tract";
    } & TractValue)
  | { type: "Delete-Item"; name: string }
  | { type: "Move-Item"; name: string; rows: ItemTractPos; cols: ItemTractPos };
export type LayoutUpdateDispatch = (a: LayoutUpdateActions) => void;

export const layoutUpdater = (
  currentLayout: GridLayoutTemplate,
  action: LayoutUpdateActions
) => {
  const newLayout = { ...currentLayout };
  switch (action.type) {
    case "Change-Gap":
      newLayout.gap = action.gap;
      return newLayout;
    case "Change-Tract":
      newLayout[action.dir][action.index] = action.val;
      return newLayout;
    case "Delete-Item":
      newLayout.items = newLayout.items.filter(
        (item) => item.name !== action.name
      );
      return newLayout;
    case "Move-Item":
      newLayout.items = newLayout.items.map((item) => {
        if (item.name === action.name) {
          item.rows = action.rows;
          item.cols = action.cols;
        }
        return item;
      });
      return newLayout;
    default:
      throw new Error("Unexpected action");
  }
};
