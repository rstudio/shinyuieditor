import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from "recoil";
import { CSSMeasure, GridLayoutTemplate } from "../../types";
import { combinedItemsState } from "../gridItems";

export type TractDirection = "rows" | "cols";
export type TractPosition = { index: number; dir: TractDirection };
export type GridTractDefs = CSSMeasure[];
export type GridTracts = Pick<GridLayoutTemplate, TractDirection>;

const DEFAULT_TEMPLATE_NAME = "default template name";

export const gridTemplateName = atom<string>({
  key: "gridTemplateName",
  default: DEFAULT_TEMPLATE_NAME,
});

export const numTractsState = atomFamily<number, TractDirection>({
  key: "numTractsState",
  default: 0,
});
export type TractCountsAtom = ReturnType<typeof numTractsState>;
export const gridRowsAtomFamily = atomFamily<CSSMeasure, number>({
  key: "gridRowsAtomFamily",
  default: "1fr",
});
export const gridColsAtomFamily = atomFamily<CSSMeasure, number>({
  key: "gridColsAtomFamily",
  default: "1fr",
});
export type GridTractAtomFamily = typeof gridRowsAtomFamily;
export type GridTractAtom = ReturnType<GridTractAtomFamily>;

export const combinedTractsState = selectorFamily<CSSMeasure[], TractDirection>(
  {
    key: "combinedTracts`",
    get:
      (dir) =>
      ({ get }) => {
        const numTracts = get(numTractsState(dir));
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
        tractValues.forEach((tractSize, i) => set(tractFamily(i), tractSize));
        set(numTractsState(dir), tractValues.length);
      },
  }
);

export const tractDimsState = selector<{ numRows: number; numCols: number }>({
  key: "tractDimsState",
  get: ({ get }) => ({
    numRows: get(numTractsState("rows")),
    numCols: get(numTractsState("cols")),
  }),
});
export type GridTractDimsState = typeof tractDimsState;

export const gapState = atom({
  key: "gapState", // unique ID (with respect to other atoms/selectors)
  default: "1rem", // default value (aka initial value)
});
export type GapStateAtom = typeof gapState;

// Just keeps tract of the tracts and gap sizings. Useful for settings css
export const combinedLayoutSizesState = selector<
  Omit<GridLayoutTemplate, "items" | "name">
>({
  key: "combinedLayoutSizes",
  get: ({ get }) => {
    return {
      gap: get(gapState),
      rows: get(combinedTractsState("rows")),
      cols: get(combinedTractsState("cols")),
    };
  },
});

// Merge all the state together in its entirety.
export const fullAppState = selector<GridLayoutTemplate>({
  key: "fullLayoutState",
  get: ({ get }) => ({
    ...get(combinedLayoutSizesState),
    items: get(combinedItemsState),
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
    set(combinedItemsState, items);
    set(combinedTractsState("rows"), rows as CSSMeasure[]);
    set(combinedTractsState("cols"), cols as CSSMeasure[]);

    set(gridTemplateName, name);
    set(gapState, gap);
  },
});
