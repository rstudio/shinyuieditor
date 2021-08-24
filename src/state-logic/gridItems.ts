import { atom, atomFamily, useRecoilCallback } from "recoil";
import { GridItemDef } from "../types";

export const itemNamesState = atom<string[]>({
  key: "itemNamesState",
  default: [],
});

export const gridItemsState = atomFamily<GridItemDef, string>({
  key: "gridItemsState",
  default: {
    name: "default",
    startRow: 1,
    endRow: 1,
    startCol: 1,
    endCol: 1,
  },
});

export const useAddNewItem = () => {
  return useRecoilCallback(({ set }) => (itemDef: GridItemDef) => {
    // Add item to both the names list and the state atom family
    set(itemNamesState, (items) => [...items, itemDef.name]);
    set(gridItemsState(itemDef.name), { ...itemDef });
  });
};

export const useDeleteItem = () => {
  return useRecoilCallback(({ set, reset }) => (name: string) => {
    set(itemNamesState, (items) => items.filter((item) => item !== name));
    reset(gridItemsState(name));
  });
};
