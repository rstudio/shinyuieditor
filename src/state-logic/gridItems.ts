import {
  atom,
  atomFamily,
  DefaultValue,
  RecoilState,
  RecoilValue,
  selector,
  useRecoilTransaction_UNSTABLE,
} from "recoil";
import { GridItemDef } from "../GridTypes";

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

// Allows item deletion to be easily done within a transaction without recoil
// getting mad about calling another transaction as happens with useDeleteItem
export function deleteAnItem(
  name: string,
  get: <T>(a: RecoilValue<T>) => T,
  set: <T>(s: RecoilState<T>, u: T | ((currVal: T) => T)) => void,
  reset: (s: RecoilState<any>) => void
) {
  set(gridItemNames, (items) => items.filter((item) => item !== name));
  const currentlySelectedItem = get(selectedItemNameState);

  // Make sure that we're not leaving the deleted item selected
  if (currentlySelectedItem === name) {
    reset(selectedItemNameState);
  }
  reset(gridItemAtoms(name));
}
export const useDeleteItem = () => {
  return useRecoilTransaction_UNSTABLE(
    ({ get, set, reset }) =>
      (name: string) => {
        deleteAnItem(name, get, set, reset);
      },
    []
  );
};

export const selectedItemNameState = atom<string | null>({
  key: "selectedItemName",
  default: null,
});

export function useToggleSelectedItem() {
  const toggleSelected = useRecoilTransaction_UNSTABLE(
    ({ get, set }) =>
      (name: string) => {
        set(selectedItemNameState, (previousSelection) =>
          previousSelection === name ? null : name
        );
      }
  );

  return toggleSelected;
}

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

export function gatherAllItems(get: <T>(a: RecoilValue<T>) => T) {
  const allNames = get(gridItemNames);
  return allNames.map((name) => get(gridItemAtoms(name)));
}

// Merges together all the atoms so we can work with all atoms at once easily
// for settings or getting in aggregate
export const combinedItemsState = selector<GridItemDef[]>({
  key: "combinedItemsState",
  get: ({ get }) => gatherAllItems(get),
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
