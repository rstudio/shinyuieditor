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
  | {
      type: "Delete-Item";
      name: string;
    }
  | {
      type: "Move-Item";
      name: string;
      rows: ItemTractPos;
      cols: ItemTractPos;
    };

export type LayoutUpdateDispatch = (a: LayoutUpdateActions) => void;

export const layoutUpdater = (
  currentLayout: GridLayoutTemplate,
  action: LayoutUpdateActions
) => {
  switch (action.type) {
    case "Set-Gap":
      return {
        ...currentLayout,
        gap: action.gap,
      };
    case "Set-Tract":
      return setTractValue(currentLayout, action.tract);
    case "Delete-Item":
      return deleteItem(currentLayout, action.name);
    case "Move-Item":
      return moveItem(currentLayout, action);
    default:
      throw new Error("Unexpected action");
  }
};

const copyLayout = (oldLayout: GridLayoutTemplate) => {
  return { ...oldLayout };
};

const setTractValue = (oldLayout: GridLayoutTemplate, tract: TractValue) => {
  const layout = copyLayout(oldLayout);
  const { dir, index, val } = tract;
  layout[dir][index] = val;
  return layout;
};

const deleteItem = (oldLayout: GridLayoutTemplate, name: string) => {
  const layout = copyLayout(oldLayout);
  layout.items = layout.items.filter((item) => item.name !== name);
  return layout;
};

const moveItem = (
  oldLayout: GridLayoutTemplate,
  { name, rows, cols }: { name: string; rows: ItemTractPos; cols: ItemTractPos }
) => {
  const layout = copyLayout(oldLayout);

  layout.items = layout.items.map((item) => {
    if (item.name === name) {
      item.rows = rows;
      item.cols = cols;
    }
    return item;
  });
  return layout;
};
