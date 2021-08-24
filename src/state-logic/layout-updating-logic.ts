import { atom, SetterOrUpdater } from "recoil";
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

export function moveItem(
  setItems: SetterOrUpdater<GridItemDef[]>,
  itemPos: GridItemDef
) {
  setItems((items) =>
    items.map((item) => {
      if (item.name === itemPos.name) return { ...itemPos };
      return { ...item };
    })
  );
}

export type LayoutDispatch = (action: LayoutUpdateActions) => void;

type GridTracts = Pick<GridLayoutTemplate, "rows" | "cols">;
export const gridTractsState = atom<GridTracts>({
  key: "gridTractsState",
  default: {
    rows: ["1fr", "1fr"],
    cols: ["1fr", "1fr"],
  },
});

export function updateTract(
  setTracts: SetterOrUpdater<GridTracts>,
  { dir, index, val }: TractValue
) {
  setTracts(({ rows, cols }) => {
    const updateTracts = {
      rows: [...rows],
      cols: [...cols],
    };
    updateTracts[dir][index] = val;
    return updateTracts;
  });
}

export const gapState = atom({
  key: "gapState", // unique ID (with respect to other atoms/selectors)
  default: "1rem", // default value (aka initial value)
});
