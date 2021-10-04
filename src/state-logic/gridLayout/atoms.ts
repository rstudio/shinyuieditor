import { atom, DefaultValue, selector, selectorFamily } from "recoil";
import { CSSMeasure, GridLayoutTemplate } from "../../GridTypes";
import { combinedItemsState } from "state-logic/gridItems";

export type TractDirection = "rows" | "cols";
export type TractPosition = { index: number; dir: TractDirection };
export type GridTractDefs = CSSMeasure[];
export type GridTracts = Pick<GridLayoutTemplate, TractDirection>;

const DEFAULT_TEMPLATE_NAME = "default template name";

export const gridTemplateName = atom<string>({
  key: "gridTemplateName",
  default: DEFAULT_TEMPLATE_NAME,
});

export const rowsState = atom<GridLayoutTemplate["rows"]>({
  key: "rows",
  default: [],
});

export const tractDims = selectorFamily<number, TractDirection>({
  key: "numRows",
  get:
    (dir) =>
    ({ get }) =>
      get(dir === "rows" ? rowsState : colsState).length,
});

export const colsState = atom<GridLayoutTemplate["cols"]>({
  key: "cols",
  default: [],
});

export const gapState = atom<CSSMeasure>({
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
      rows: get(rowsState),
      cols: get(colsState),
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
    set(rowsState, rows);
    set(colsState, cols);

    set(gridTemplateName, name);
    set(gapState, gap);
  },
});
