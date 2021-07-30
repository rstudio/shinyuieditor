import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { GridLayoutTemplate, TractValue } from "./types";

type LayoutUpdateActions =
  | {
      type: "Change-Gap";
      gap: string;
    }
  | ({
      type: "Change-Tract";
    } & TractValue);
export type LayoutUpdateDispatch = (a: LayoutUpdateActions) => void;

export const layoutUpdater = (
  currentLayout: GridLayoutTemplate,
  action: LayoutUpdateActions
) => {
  switch (action.type) {
    case "Change-Gap":
      return {
        ...currentLayout,
        gap: action.gap,
      };
    case "Change-Tract":
      const newLayout = { ...currentLayout };
      newLayout[action.dir][action.index] = action.val;
      return newLayout;
    default:
      throw new Error("Unexpected action");
  }
};

// We use context to pass dispatch methods to child props as that's the
// recomended approach from the react docs. Props only influence how the
// element looks, thus if the updater changes for whatever reason we don't
// rerender the component.
// https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
export const LayoutDispatch = createContext<LayoutUpdateDispatch | null>(null);

export const useLayoutDispatch = () => {
  return useContext(LayoutDispatch) as LayoutUpdateDispatch;
};
