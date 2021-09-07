import { atom, atomFamily, DefaultValue, selector } from "recoil";
import { GridItemDef } from "../../types";

export const itemNamesState = atom<string[]>({
  key: "itemNamesState",
  default: [],
});
export type ItemNamesAtom = typeof itemNamesState;

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
export type GridItemsAtomFamily = typeof gridItemsState;

export const fullItemsState = selector<GridItemDef[]>({
  key: "fullItemsState",
  get: ({ get }) => {
    const allNames = get(itemNamesState);
    return allNames.map((name) => get(gridItemsState(name)));
  },
  set: ({ set }, items) => {
    if (items instanceof DefaultValue) {
      console.error("Trying to set item values to default value");
      return;
    }

    // Add each item to the state atom family
    items.forEach((itemDef: GridItemDef) => {
      set(gridItemsState(itemDef.name), { ...itemDef });
    });

    // Also update the names list
    set(
      itemNamesState,
      items.map(({ name }) => name)
    );
  },
});
