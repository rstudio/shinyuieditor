import {
  atom,
  atomFamily,
  RecoilState,
  selector,
  useRecoilCallback,
} from "recoil";
import { CSSMeasure, GridItemDef, GridLayoutTemplate } from "../types";
import { useAddNewItem } from "./gridItems";

export type GridTractDefs = CSSMeasure[];
export type GridTracts = Pick<GridLayoutTemplate, "rows" | "cols">;

export const gridTemplateName = atom<string>({
  key: "gridTemplateName",
  default: "unselected",
});

export const gridRowsAtomFamily = atomFamily<CSSMeasure, number>({
  key: "gridRowsAtomFamily",
  default: "1fr",
});
const numRowsState = atom<number>({
  key: "numRowsState",
  default: 0,
});

export const useTractState = (
  tractCountAtom: RecoilState<number>,
  tractsAtomFamily: (param: number) => RecoilState<CSSMeasure>
) => {
  const addNewTract = useRecoilCallback(
    ({ set, snapshot }) =>
      async (tractSize: CSSMeasure, index?: number) => {
        const tractIndex = index ?? (await snapshot.getPromise(tractCountAtom));
        // Add item to both the names list and the state atom family
        set(tractsAtomFamily(tractIndex), tractSize);
        set(tractCountAtom, (n) => n + 1);
      },
    []
  );

  const addNewTracts = useRecoilCallback(
    () => (tractValues: CSSMeasure[]) => {
      tractValues.forEach((rowSize, i) => addNewTract(rowSize, i));
    },
    []
  );

  const resetTracts = useRecoilCallback(
    ({ reset, snapshot }) =>
      async () => {
        const numTracts = await snapshot.getPromise(tractCountAtom);
        for (let i = 0; i < numTracts; i++) {
          reset(tractsAtomFamily(i));
        }

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

export const useAddNewRow = () => {
  return useTractState(numRowsState, gridRowsAtomFamily);
};

export const gridColsAtomFamily = atomFamily<CSSMeasure, number>({
  key: "gridColsAtomFamily",
  default: "1fr",
});
const numColsState = atom<number>({
  key: "numColsState",
  default: 0,
});
export const useAddNewCol = () => {
  return useTractState(numColsState, gridColsAtomFamily);
};

export const tractDimsState = selector<{ numRows: number; numCols: number }>({
  key: "tractDimsState",
  get: ({ get }) => ({
    numRows: get(numRowsState),
    numCols: get(numColsState),
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

export function useLayoutStateSetter() {
  const addNewItem = useAddNewItem();
  const rowState = useAddNewRow();
  const colState = useAddNewCol();
  const setUpNewLayout = useRecoilCallback(
    ({ set, snapshot }) =>
      async ({ rows, cols, gap, name, items }: GridLayoutTemplate) => {
        const currentLayoutName = await snapshot.getPromise(gridTemplateName);

        if (currentLayoutName === name) {
          console.log("Layout template has not changed so ending early");
          return;
        }
        set(gridTemplateName, name);

        items.forEach((itemDef) => addNewItem(itemDef));
        rowState.addAll(rows as CSSMeasure[]);
        colState.addAll(cols as CSSMeasure[]);

        set(gapState, gap);
      },
    []
  );

  return setUpNewLayout;
}

export function useInitiateLayoutState(startingLayout: GridLayoutTemplate) {
  const layoutSetter = useLayoutStateSetter();
  layoutSetter(startingLayout);
}
