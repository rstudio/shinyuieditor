import { ShinyUiNameAndProps } from "components/shiny-ui/componentTypes";
import { atomFamily } from "recoil";

export type UiElementAtom = ShinyUiNameAndProps | "unset";

export const uiElementAtoms = atomFamily<UiElementAtom, string>({
  key: "uiElementAtoms",
  default: "unset",
});
