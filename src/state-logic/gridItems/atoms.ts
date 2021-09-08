import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from "recoil";
import { GridItemDef } from "../../types";

export const gridItemNames = atom<string[]>({
  key: "itemNamesState",
  default: [],
});
export type GridItemNamesAtom = typeof gridItemNames;

// This gets wrapped within a selectorFamily for easier control of the names
// so we dont use it outside of this script
const gridItemsStateInternal = atomFamily<GridItemDef, string>({
  key: "gridItemsState",
  default: {
    name: "default",
    startRow: 1,
    endRow: 1,
    startCol: 1,
    endCol: 1,
  },
});

export const gridItemsState = selectorFamily<GridItemDef, string>({
  key: "gridItemsSelFam",
  get:
    (name: string) =>
    ({ get }) =>
      get(gridItemsStateInternal(name)),
  set:
    (name: string) =>
    ({ set, reset }, itemDef) => {
      if (itemDef instanceof DefaultValue) {
        // Means we're in reset context
        reset(gridItemsStateInternal(name));
        // Remove this item from the names list
        set(gridItemNames, (items) => items.filter((item) => item !== name));
        return;
      }

      set(gridItemNames, (items) => {
        // If we're updating an exisiting item (say from dragging) then we don't
        // want to add its name again to the list of names
        if (items.includes(name)) return items;
        return [...items, itemDef.name];
      });
      set(gridItemsStateInternal(name), itemDef);
    },
});

export type GridItemsAtomFamily = typeof gridItemsState;
export type GridItemAtom = ReturnType<GridItemsAtomFamily>;

export const fullItemsState = selector<GridItemDef[]>({
  key: "fullItemsState",
  get: ({ get }) => {
    const allNames = get(gridItemNames);
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
      gridItemNames,
      items.map(({ name }) => name)
    );
  },
});
