import { useEffect } from "preact/hooks";
import { atom, atomFamily, useRecoilCallback, useSetRecoilState } from "recoil";
import { CSSMeasure, GridItemDef, GridLayoutTemplate } from "../types";
import { useAddNewItem } from "./gridItems";

export type GridTractDefs = CSSMeasure[];
export type GridTracts = Pick<GridLayoutTemplate, "rows" | "cols">;

export const gridRowsState = atom<GridTractDefs>({
  key: "gridRowsState",
  default: ["1fr"],
});
export const numRowsState = atom<number>({
  key: "numRowsState",
  default: 1,
});
export const useAddNewRow = () => {
  return useRecoilCallback(
    ({ set }) =>
      (rowSize: CSSMeasure, index?: number) => {
        // Add item to both the names list and the state atom family
        set(gridRowsState, (rows) => [...rows, rowSize]);
        set(numRowsState, (n) => n + 1);
      }
  );
};

export const gridColsState = atom<GridTractDefs>({
  key: "gridColsState",
  default: ["1fr"],
});
export const numColsState = atom<number>({
  key: "numColsState",
  default: 1,
});
export const useAddNewCol = () => {
  return useRecoilCallback(
    ({ set }) =>
      (colSize: CSSMeasure, index?: number) => {
        // Add item to both the names list and the state atom family
        set(gridColsState, (cols) => [...cols, colSize]);
        set(numColsState, (n) => n + 1);
      }
  );
};

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
  const setRows = useSetRecoilState(gridRowsState);
  const setNumRows = useSetRecoilState(numRowsState);
  const setCols = useSetRecoilState(gridColsState);
  const setNumCols = useSetRecoilState(numColsState);

  // Load initial state just once at the first render of component
  useEffect(() => {
    startingLayout.items.forEach((itemDef) => addNewItem(itemDef));
    setRows(startingLayout.rows as CSSMeasure[]);
    setNumRows(startingLayout.rows.length);
    setCols(startingLayout.cols as CSSMeasure[]);
    setNumCols(startingLayout.cols.length);
    setGapSize(startingLayout.gap);
  }, []);
}
