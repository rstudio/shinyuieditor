import { useEffect } from "preact/hooks";
import {
  atom,
  atomFamily,
  selector,
  useRecoilCallback,
  useSetRecoilState,
} from "recoil";
import { CSSMeasure, GridItemDef, GridLayoutTemplate } from "../types";
import { useAddNewItem } from "./gridItems";

export type GridTractDefs = CSSMeasure[];
export type GridTracts = Pick<GridLayoutTemplate, "rows" | "cols">;

export const gridRowsAtomFamily = atomFamily<CSSMeasure, number>({
  key: "gridRowsAtomFamily",
  default: "1fr",
});
export const numRowsState = atom<number>({
  key: "numRowsState",
  default: 0,
});
export const allRowsState = selector<GridTractDefs>({
  key: "allRowsState",
  get: ({ get }) => {
    const numRows = get(numRowsState);
    return Array.from({ length: numRows }, (_, i) =>
      get(gridRowsAtomFamily(i))
    );
  },
});
export const useAddNewRow = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async (rowSize: CSSMeasure, index?: number) => {
        const rowIndex = index ?? (await snapshot.getPromise(numRowsState));
        // Add item to both the names list and the state atom family
        set(gridRowsAtomFamily(rowIndex), rowSize);
        set(numRowsState, (n) => n + 1);
      }
  );
};

export const gridColsAtomFamily = atomFamily<CSSMeasure, number>({
  key: "gridColsAtomFamily",
  default: "1fr",
});
export const gridColsState = selector<GridTractDefs>({
  key: "gridColsState",
  get: ({ get }) => {
    const numCols = get(numColsState);
    return Array.from({ length: numCols }, (_, i) =>
      get(gridColsAtomFamily(i))
    );
  },
});
export const numColsState = atom<number>({
  key: "numColsState",
  default: 1,
});
export const useAddNewCol = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async (colSize: CSSMeasure, index?: number) => {
        const colIndex = index ?? (await snapshot.getPromise(numColsState));
        // Add item to both the names list and the state atom family
        set(gridColsAtomFamily(colIndex), colSize);
        set(numColsState, (n) => n + 1);
      }
  );
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

export function useInitiateLayoutState(startingLayout: GridLayoutTemplate) {
  const setGapSize = useSetRecoilState(gapState);
  const addNewItem = useAddNewItem();
  const setNumCols = useSetRecoilState(numColsState);
  const addNewRow = useAddNewRow();
  const addNewCol = useAddNewCol();

  // Load initial state just once at the first render of component
  useEffect(() => {
    startingLayout.items.forEach((itemDef) => addNewItem(itemDef));
    (startingLayout.rows as CSSMeasure[]).forEach((rowSize, i) =>
      addNewRow(rowSize, i)
    );

    (startingLayout.cols as CSSMeasure[]).forEach((colSize, i) =>
      addNewCol(colSize, i)
    );
    setNumCols(startingLayout.cols.length);
    setGapSize(startingLayout.gap);
  }, []);
}
