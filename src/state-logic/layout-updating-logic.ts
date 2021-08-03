import { GridLayoutTemplate, ItemTractPos, TractValue } from "../types";

type LayoutUpdateActions =
  | {
      type: "Set-Gap";
      gap: string;
    }
  | {
      type: "Set-Tract";
      tract: TractValue;
    }
  | { type: "Delete-Item"; name: string }
  | { type: "Move-Item"; name: string; rows: ItemTractPos; cols: ItemTractPos };
export type LayoutUpdateDispatch = (a: LayoutUpdateActions) => void;

export const layoutUpdater = (
  currentLayout: GridLayoutTemplate,
  action: LayoutUpdateActions
) => {
  const newLayout = { ...currentLayout };
  switch (action.type) {
    case "Set-Gap":
      newLayout.gap = action.gap;
      return newLayout;
    case "Set-Tract":
      newLayout[action.tract.dir][action.tract.index] = action.tract.val;
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
