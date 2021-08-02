import { createContext } from "preact";
import { useContext } from "preact/hooks";

type XYPos = { x: number; y: number };

export type DragPos = {
  XStart: number;
  YStart: number;
  XCurrent: number;
  YCurrent: number;
  width: number;
  height: number;
} | null;

type DragUpdateActions =
  | {
      type: "start";
      pos: XYPos;
    }
  | {
      type: "end";
    }
  | {
      type: "move";
      pos: XYPos;
    };

export const dragUpdater = (
  currentDragPos: DragPos,
  action: DragUpdateActions
) => {
  console.log("Drag updater was called!");
  switch (action.type) {
    case "start":
      return {
        XStart: action.pos.x,
        YStart: action.pos.y,
        XCurrent: action.pos.x,
        YCurrent: action.pos.y,
        height: 0,
        width: 0,
      };
    case "end":
      return null;
    case "move":
      if (!currentDragPos)
        throw new Error("Can't move rectangle that is un-initialized");
      const {
        pos: { x, y },
      } = action;
      const { XStart, YStart } = currentDragPos;
      return {
        XStart,
        YStart,
        XCurrent: x,
        YCurrent: y,
        width: x - XStart,
        height: y - YStart,
      };
    default:
      throw new Error("Unexpected action");
  }
};

// We use context to pass dispatch methods to child props as that's the
// recomended approach from the react docs. Props only influence how the
// element looks, thus if the updater changes for whatever reason we don't
// rerender the component.
// https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
export type DragUpdateDispatch = (a: DragUpdateActions) => void;
export const DragDispatch = createContext<DragUpdateDispatch | null>(null);

export const useDragDispatch = () => {
  return useContext(DragDispatch) as DragUpdateDispatch;
};
