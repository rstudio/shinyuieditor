import { useCallback } from "preact/hooks";
import {
  atom,
  atomFamily,
  RecoilState,
  selector,
  useRecoilCallback,
  useRecoilTransaction_UNSTABLE,
} from "recoil";
import { CSSMeasure, GridItemDef, GridLayoutTemplate } from "../types";
import { useGridItemState } from "./gridItems";

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

export const gridRowsAtomFamily = atomFamily<CSSMeasure, number>({
  key: "gridRowsAtomFamily",
  default: "1fr",
});
export const numRowsState = atom<number>({
  key: "numRowsState",
  default: 0,
});

export const gridColsAtomFamily = atomFamily<CSSMeasure, number>({
  key: "gridColsAtomFamily",
  default: "1fr",
});
export const numColsState = atom<number>({
  key: "numColsState",
  default: 0,
});

export const useTractState = (
  tractCountAtom: RecoilState<number>,
  tractsAtomFamily: (param: number) => RecoilState<CSSMeasure>
) => {
  const addNewTract = useRecoilTransaction_UNSTABLE(
    ({ set }) =>
      (tractSize: CSSMeasure, index: number) => {
        // Add item to both the names list and the state atom family
        set(tractsAtomFamily(index), tractSize);
        set(tractCountAtom, (n) => n + 1);
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
        // for (let i = 0; i < numTracts; i++) {
        //   reset(tractsAtomFamily(i));
        // }

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

type TractAtomSetter = (
  s: RecoilState<CSSMeasure>,
  u: CSSMeasure | ((currVal: CSSMeasure) => CSSMeasure)
) => void;
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

// function addTract(tractSize: CSSMeasure, index: number);

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
  const itemState = useGridItemState();
  const rowState = useTractState(numRowsState, gridRowsAtomFamily);
  const colState = useTractState(numColsState, gridColsAtomFamily);

  const setUpNewLayout = useRecoilCallback(
    ({ set, reset, snapshot }) =>
      async ({ rows, cols, gap, name, items }: GridLayoutTemplate) => {
        const currentLayoutName = await snapshot.getPromise(gridTemplateName);

        if (currentLayoutName === name) {
          console.log("Layout template has not changed so ending early");
          return;
        }

        if (currentLayoutName !== DEFAULT_TEMPLATE_NAME) {
          console.log("We have a new layout template so we're resetting old");
          rowState.reset();
          colState.reset();
          itemState.reset();
          reset(gridTemplateName);
          reset(gapState);
        }

        itemState.addAll(items);
        rowState.addAll(rows as CSSMeasure[]);
        colState.addAll(cols as CSSMeasure[]);

        set(gridTemplateName, name);
        set(gapState, gap);
      },
    []
  );
  // const setUpNewLayout = useRecoilTransaction_UNSTABLE(
  //   ({ set, reset, get }) =>
  //     ({ rows, cols, gap, name, items }: GridLayoutTemplate) => {
  //       const currentLayoutName = get(gridTemplateName);

  //       if (currentLayoutName === name) {
  //         console.log("Layout template has not changed so ending early");
  //         return;
  //       }

  //       if (currentLayoutName !== DEFAULT_TEMPLATE_NAME) {
  //         console.log("We have a new layout template so we're resetting old");
  //         rowState.reset();
  //         colState.reset();
  //         itemState.reset();
  //         reset(gridTemplateName);
  //         reset(gapState);
  //       }

  //       itemState.addAll(items);
  //       rowState.addAll(rows as CSSMeasure[]);
  //       colState.addAll(cols as CSSMeasure[]);

  //       set(gridTemplateName, name);
  //       set(gapState, gap);
  //     },
  //   []
  // );
  return setUpNewLayout;
}
