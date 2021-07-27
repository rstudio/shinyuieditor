import { createContext } from "preact";
import layouts from "./layouts";
import { GridLayoutTemplate } from "./types";

type AppState = {
  layout: GridLayoutTemplate;
};

type UpdateStateAction = {
  type: "switch-layout";
  payload: string;
};

type UpdateStateReducer = (
  state: AppState,
  action: UpdateStateAction
) => AppState;

export const initialState = {
  layout: layouts[0],
};

export const stateReducer: UpdateStateReducer = (
  state: AppState,
  action: UpdateStateAction
) => {
  switch (action.type) {
    case "switch-layout":
      return {
        ...state,
        layout: layouts.find(
          (layout) => layout.name === action.payload
        ) as GridLayoutTemplate,
      };
    default:
      console.log("Nothing has changed");
      return state;
  }
};

export const CurrentLayoutCtx = createContext<{
  state: typeof initialState;
  updateState: (action: UpdateStateAction) => void;
}>({
  state: initialState,
  updateState: (action: UpdateStateAction) => {},
});
