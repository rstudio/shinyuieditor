import { useCallback } from "preact/hooks";
import {
  atom,
  atomFamily,
  DefaultValue,
  RecoilState,
  selector,
  selectorFamily,
  useRecoilTransaction_UNSTABLE,
} from "recoil";
import { CSSMeasure, GridItemDef, GridLayoutTemplate } from "../types";

export type TractDirection = "rows" | "cols";
export type GridTractDefs = CSSMeasure[];
export type GridTracts = Pick<GridLayoutTemplate, TractDirection>;

const DEFAULT_TEMPLATE_NAME = "default template name";

const gridTemplateName = atom<string>({
  key: "gridTemplateName",
  default: DEFAULT_TEMPLATE_NAME,
});

export const gridTemplateNameSel = selector<string>({
  key: "gridTemplateSelector",
  get: ({ get }) => {
    console.log("Fetching the current template name");
    const templateName = get(gridTemplateName);
    return templateName;
  },
  set: ({ set }, newName) => {
    console.log(`Setting current template name to ${newName}`);
    set(gridTemplateName, newName);
  },
});

const numTractsState = atomFamily<number, TractDirection>({
  key: "numTractsState",
  default: 0,
});
export const gridRowsAtomFamily = atomFamily<CSSMeasure, number>({
  key: "gridRowsAtomFamily",
  default: "1fr",
});
export const numRowsState = atom<number>({
  key: "numRowsState",
  default: numTractsState("rows"),
});

export const gridColsAtomFamily = atomFamily<CSSMeasure, number>({
  key: "gridColsAtomFamily",
  default: "1fr",
});
export const numColsState = atom<number>({
  key: "numColsState",
  default: numTractsState("cols"),
});

function updateItemPosForNewTract({
  itemDef,
  dir,
  tractIndex,
}: {
  itemDef: GridItemDef;
  dir: TractDirection;
  tractIndex: number;
}): GridItemDef | null {
  // Make copy to avoid mutation
  const startPos = dir === "rows" ? "startRow" : "startCol";
  const endPos = dir === "rows" ? "endRow" : "endCol";
  const currentStart = itemDef[startPos];
  const currentEnd = itemDef[endPos] ?? currentStart;

  // There are three options for positioning.
  // First: the new tract is beyond the end of the item
  //   and then nothing needs to happen
  // Second: The new tract is before the item entirely, then both the
  //   start and the end need to be shifted up
  // Third: The new tract is _within_ the boundaries of the item
  //   in this case the item needs to just have its end pos adjusted up

  if (tractIndex >= currentEnd) {
    // Beyond end of item and we dont need to do anything
    return null;
  }

  const itemDefNew = { ...itemDef };
  if (tractIndex < currentStart) {
    // Before item
    itemDefNew[startPos] = currentStart + 1;
    itemDefNew[endPos] = currentEnd + 1;
  } else {
    // Within item bounds
    itemDefNew[endPos] = currentEnd + 1;
  }

  return itemDefNew;
}

export const useTractState = (dir: TractDirection) => {
  const tractsAtomFamily =
    dir === "rows" ? gridRowsAtomFamily : gridColsAtomFamily;
  const tractCountAtom = numTractsState(dir);

  const addNewTract = useRecoilTransaction_UNSTABLE(
    ({ set, get }) =>
      (tractSize: CSSMeasure, index: number) => {
        const currNumTracts = get(tractCountAtom);
        const newNumTracts = currNumTracts + 1;

        if (index + 1 <= currNumTracts) {
          // Get the tracts that exist _after_ this current one as they will
          // have their indices shifted up one
          const numTractsShifted = currNumTracts - index;
          const laterTracts = Array.from(
            { length: numTractsShifted },
            (_, i) => {
              const currentIndex = index + i;
              return {
                index: currentIndex + 1,
                value: get(tractsAtomFamily(currentIndex)),
              };
            }
          );

          // Set the new tract
          set(tractsAtomFamily(index), tractSize);

          // Now update the ones above it
          laterTracts.forEach(({ index, value }) => {
            set(tractsAtomFamily(index), value);
          });

          const itemNames = get(itemNamesState);
          itemNames.forEach((name) => {
            const itemState = gridItemsState(name);

            const updatedDef = updateItemPosForNewTract({
              itemDef: get(itemState),
              dir,
              tractIndex: index,
            });

            // If item didnt move then the updater function returns null and we
            // can skip the update
            if (updatedDef) set(itemState, updatedDef);
          });
        } else {
          set(tractsAtomFamily(index), tractSize);
        }

        // Add item to both the names list and the state atom family
        set(tractCountAtom, newNumTracts);
      }
  );

  const addNewTracts = useCallback((tractValues: CSSMeasure[]) => {
    tractValues.forEach((rowSize, i) => addNewTract(rowSize, i));
  }, []);

  const resetTracts = useRecoilTransaction_UNSTABLE(
    ({ reset, get }) =>
      () => {
        const numTracts = get(tractCountAtom);
        resetTractStates(numTracts, tractsAtomFamily, reset);

        reset(tractCountAtom);
      },
    []
  );

  return {
    add: addNewTract,
    addAll: addNewTracts,
    reset: resetTracts,
  };
};

type TractAtomFamily = (param: number) => RecoilState<CSSMeasure>;
function resetTractStates(
  numTracts: number,
  atomFamily: TractAtomFamily,
  atomReseter: (s: RecoilState<CSSMeasure>) => void
) {
  for (let i = 0; i < numTracts; i++) {
    atomReseter(atomFamily(i));
  }
}

export const tractDimsState = selector<{ numRows: number; numCols: number }>({
  key: "tractDimsState",
  get: ({ get }) => ({
    numRows: get(numTractsState("rows")),
    numCols: get(numTractsState("cols")),
  }),
});

export const gapState = atom({
  key: "gapState", // unique ID (with respect to other atoms/selectors)
  default: "1rem", // default value (aka initial value)
});

export const allLayoutState = selector<
  Omit<GridLayoutTemplate, "items" | "name">
>({
  key: "allLayoutState",
  get: ({ get }) => {
    // const numCols = get(numTractsState("cols"));
    const numCols = get(numColsState);
    const numRows = get(numRowsState);

    return {
      gap: get(gapState),
      rows: Array.from({ length: numRows }, (_, i) =>
        get(gridRowsAtomFamily(i))
      ),
      cols: Array.from({ length: numCols }, (_, i) =>
        get(gridColsAtomFamily(i))
      ),
    };
  },
});

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

const fullTractsState = selectorFamily<CSSMeasure[], TractDirection>({
  key: "fullTractsState",
  get:
    (dir) =>
    ({ get }) => {
      const numTracts = dir === "rows" ? get(numRowsState) : get(numColsState);
      const tractFamily =
        dir === "rows" ? gridRowsAtomFamily : gridColsAtomFamily;
      return Array.from({ length: numTracts }, (_, i) => get(tractFamily(i)));
    },
  set:
    (dir) =>
    ({ set }, tractValues) => {
      if (tractValues instanceof DefaultValue) {
        console.error("Trying to set tract values to default value");
        return;
      }

      const tractFamily =
        dir === "rows" ? gridRowsAtomFamily : gridColsAtomFamily;
      const numTractsAtom = dir === "rows" ? numRowsState : numColsState;
      tractValues.forEach((tractSize, i) => set(tractFamily(i), tractSize));
      set(numTractsAtom, tractValues.length);
    },
});

const fullItemsState = selector<GridItemDef[]>({
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
    items.forEach((itemDef: GridItemDef) => {
      // Add item to the state atom family
      set(gridItemsState(itemDef.name), { ...itemDef });
    });
    // Also update the names list
    set(
      itemNamesState,
      items.map(({ name }) => name)
    );
  },
});

export const fullLayoutState = selector<GridLayoutTemplate>({
  key: "fullLayoutState",
  get: ({ get }) => ({
    rows: get(fullTractsState("rows")),
    cols: get(fullTractsState("cols")),
    items: get(fullItemsState),
    gap: get(gapState),
    name: get(gridTemplateName),
  }),
  set: ({ get, set }, template) => {
    if (template instanceof DefaultValue) {
      console.error("Trying to set item values to default value");
      return;
    }

    const { rows, cols, gap, name, items } = template;

    const currentLayoutName = get(gridTemplateName);
    if (currentLayoutName === name) {
      console.log("Layout template has not changed so ending early");
      return;
    }

    if (currentLayoutName !== DEFAULT_TEMPLATE_NAME) {
      console.log("We have a new layout template so we're resetting old");
      // rowState.reset();
      // colState.reset();
      // itemState.reset();
      // reset(gridTemplateName);
      // reset(gapState);
    }
    set(fullItemsState, items);
    set(fullTractsState("rows"), rows as CSSMeasure[]);
    set(fullTractsState("cols"), cols as CSSMeasure[]);

    set(gridTemplateName, name);
    set(gapState, gap);
  },
});
