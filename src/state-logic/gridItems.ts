import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  useRecoilTransaction_UNSTABLE,
} from "recoil";
import { GridItemDef } from "../types";

export const gridItemNames = atom<string[]>({
  key: "itemNamesState",
  default: [],
});
export type GridItemNamesAtom = typeof gridItemNames;

// This gets wrapped within a selectorFamily for easier control of the names
// so we dont use it outside of this script
export const gridItemAtoms = atomFamily<GridItemDef, string>({
  key: "gridItemsState",
  default: {
    name: "default",
    startRow: 1,
    endRow: 1,
    startCol: 1,
    endCol: 1,
  },
});

// Adds a new item to both the name list and creates its new state atom
export const useAddNewItem = () => {
  return useRecoilTransaction_UNSTABLE(
    ({ set }) =>
      (itemDef: GridItemDef | GridItemDef[]) => {
        if (!Array.isArray(itemDef)) itemDef = [itemDef];

        itemDef.forEach((def) => {
          set(gridItemNames, (names) => [...names, def.name]);
          set(gridItemAtoms(def.name), def);
        });
      },
    []
  );
};
export const useDeleteItem = () => {
  return useRecoilTransaction_UNSTABLE(
    ({ get, set, reset }) =>
      (name: string) => {
        set(gridItemNames, (items) => items.filter((item) => item !== name));
        const currentlySelectedItem = get(selectedItemNameState);

        // Make sure that we're not leaving the deleted item selected
        if (currentlySelectedItem === name) {
          reset(selectedItemNameState);
        }
        reset(gridItemAtoms(name));
      },
    []
  );
};

export const selectedItemNameState = atom<string | null>({
  key: "selectedItemName",
  default: null,
});

export const setSelectedItemNameState = selector<string | null>({
  key: "setSelectedItemNameState",
  get: ({ get }) => get(selectedItemNameState),
  set: ({ set }, nameOfItem) => {
    set(selectedItemNameState, (previousSelection) =>
      previousSelection === nameOfItem ? null : nameOfItem
    );
  },
});

export const selectedItemState = selector<GridItemDef | null>({
  key: "selectedItem",
  get: ({ get }) => {
    const selectedItemName = get(selectedItemNameState);
    if (!selectedItemName) return null;

    return get(gridItemAtoms(selectedItemName));
  },
  set: ({ get, set }, newDef) => {
    const selectedItemName = get(selectedItemNameState);
    if (!selectedItemName || !newDef) return;

    set(gridItemAtoms(selectedItemName), newDef);
  },
});

export type GridItemsAtomFamily = typeof gridItemAtoms;
export type GridItemAtom = ReturnType<GridItemsAtomFamily>;

// Merges together all the atoms so we can work with all atoms at once easily
// for settings or getting in aggregate
export const combinedItemsState = selector<GridItemDef[]>({
  key: "combinedItemsState",
  get: ({ get }) => {
    const allNames = get(gridItemNames);
    return allNames.map((name) => get(gridItemAtoms(name)));
  },
  set: ({ set }, items) => {
    if (items instanceof DefaultValue) {
      console.error("Trying to set item values to default value");
      return;
    }

    // Add each item to the state atom family
    items.forEach((itemDef: GridItemDef) => {
      set(gridItemAtoms(itemDef.name), { ...itemDef });
    });

    // Also update the names list
    set(
      gridItemNames,
      items.map(({ name }) => name)
    );
  },
});
