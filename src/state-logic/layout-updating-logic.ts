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
    };

export type LayoutUpdateDispatch = (a: LayoutUpdateActions) => void;

export const layoutUpdater = (
  layout: GridLayoutTemplate,
  action: LayoutUpdateActions
) => {
  switch (action.type) {
    case "Set-Gap":
      return { ...layout, gap: action.gap };
    case "Set-Tract":
      return setTractValue(layout, action.tract);
    case "Delete-Item":
      return deleteItem(layout, action.name);
    case "Move-Item":
      return moveItem(layout, action.itemDef);
    default:
      throw new Error("Unexpected action");
  }
};

const copyLayout = (oldLayout: GridLayoutTemplate) => {
  // This is not a true copy as everything but the gap and name will be copied
  // by ref so it may need to be updated once time-travel like state is added
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
  { name, rows, cols }: GridItemDef
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
