import { ShinyUiNameAndProps } from "components/shiny-ui/componentTypes";
import { atomFamily, selector } from "recoil";
import { selectedItemNameState } from "./gridItems";

export type UiElementAtom = ShinyUiNameAndProps | "unset";

export const uiElementAtoms = atomFamily<UiElementAtom, string>({
  key: "uiElementAtoms",
  default: "unset",
});

export const selectedUiElement = selector<UiElementAtom | null>({
  key: "selectedUiElement",
  get: ({ get }) => {
    const selectedItemName = get(selectedItemNameState);
    if (!selectedItemName) return null;

    return get(uiElementAtoms(selectedItemName));
  },
  set: ({ get, set }, newDef) => {
    const selectedItemName = get(selectedItemNameState);
    if (!selectedItemName || !newDef) return;

    set(uiElementAtoms(selectedItemName), newDef);
  },
});
