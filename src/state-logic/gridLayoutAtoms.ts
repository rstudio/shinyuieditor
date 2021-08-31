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

export const useTractState = (dir: TractDirection) => {
  const tractsAtomFamily =
    dir === "rows" ? gridRowsAtomFamily : gridColsAtomFamily;
  const tractCountAtom = dir === "rows" ? numRowsState : numColsState;

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
  const rowState = useTractState("rows");
  const colState = useTractState("cols");

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
