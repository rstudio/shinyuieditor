import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from "recoil";
import { CSSMeasure, GridLayoutTemplate } from "../../types";
import { fullItemsState } from "../gridItems/atoms";

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

const fullTractsState = selectorFamily<CSSMeasure[], TractDirection>({
  key: "fullTractsState",
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
});

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

export const allLayoutState = selector<
  Omit<GridLayoutTemplate, "items" | "name">
>({
  key: "allLayoutState",
  get: ({ get }) => {
    const numCols = get(numTractsState("cols"));
    const numRows = get(numTractsState("rows"));

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
