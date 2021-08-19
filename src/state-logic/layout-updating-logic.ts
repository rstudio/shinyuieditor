import { useReducer } from "preact/hooks";
import {
  CSSMeasure,
  GridItemDef,
  GridLayoutTemplate,
  TractValue,
} from "../types";

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

// Convert these to referentially static callbacks that can be imported
// thus avoiding unneccesary rerenders due to the setter changing.
export function useGridLayoutState(startingLayout: GridLayoutTemplate) {
  const [layout, layoutDispatch] = useReducer(layoutUpdater, startingLayout);

  return {
    layout,
    layoutDispatch,
    setGap: (gap: CSSMeasure) => layoutDispatch({ type: "Set-Gap", gap }),
    setTract: (tract: TractValue) =>
      layoutDispatch({ type: "Set-Tract", tract }),
    deleteItem: (name: string) => layoutDispatch({ type: "Delete-Item", name }),
    addItem: (itemDef: GridItemDef) =>
      layoutDispatch({ type: "Add-Item", itemDef }),
    moveItem: (itemDef: GridItemDef) =>
      layoutDispatch({ type: "Move-Item", itemDef }),
  };
}
