import { GridItemDef, GridLayoutTemplate, TractValue } from "../types";

type LayoutUpdateActions =
  | {
      type: "Set-Gap";
      gap: string;
    }
  | {
      type: "Set-Tract";
      tract: TractValue;
    }
  | {
      type: "Delete-Item";
      name: string;
    }
  | {
      type: "Move-Item";
      itemDef: GridItemDef;
    }
  | {
      type: "Add-Item";
      itemDef: GridItemDef;
    };

export const layoutUpdater = (
  oldLayout: GridLayoutTemplate,
  action: LayoutUpdateActions
) => {
  // This is not a true copy as everything but the gap and name will be copied
  // by ref so it may need to be updated once time-travel like state is added
  const layout = { ...oldLayout };

  switch (action.type) {
    case "Set-Gap":
      layout.gap = action.gap;
      break;

    case "Set-Tract":
      layout[action.tract.dir][action.tract.index] = action.tract.val;
      break;

    case "Delete-Item":
      layout.items = layout.items.filter((item) => item.name !== action.name);
      break;

    case "Move-Item":
      layout.items = layout.items.map((item) => {
        if (item.name === action.itemDef.name) return { ...action.itemDef };
        return { ...item };
      });
      break;

    case "Add-Item":
      layout.items.push(action.itemDef);
      break;

    default:
      throw new Error("Unexpected action");
  }

  return layout;
};

export type LayoutDispatch = (action: LayoutUpdateActions) => void;
