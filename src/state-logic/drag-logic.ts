import { createContext, RefObject } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { DragDir, GridCellPos } from "../types";

export type ItemDragStart = {
  name: string;
  dir: DragDir;
  x: number;
  y: number;
};
export type ItemDragStartEvent = CustomEvent<ItemDragStart>;

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

      return {
        ...currentDragPos,
        XCurrent: action.pos.x,
        YCurrent: action.pos.y,
        width: action.pos.x - currentDragPos.XStart,
        height: action.pos.y - currentDragPos.XStart,
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

function isCustomEvent(event: Event): event is CustomEvent {
  return "detail" in event;
}

export const useDragHandler = ({
  updateDragState,
  watchingRef,
}: {
  updateDragState: DragUpdateDispatch;
  watchingRef: RefObject<HTMLDivElement>;
}) => {
  let cellPositions: Array<GridCellPos>;
  const startDrag = (e: Event) => {
    if (!isCustomEvent(e)) throw new Error("not a custom event");

    const startInfo = e.detail as ItemDragStart;
    updateDragState({
      type: "start",
      pos: startInfo,
    });
    const gridCells = watchingRef.current?.querySelectorAll(
      ".gridCell"
    ) as NodeListOf<HTMLDivElement>;

    cellPositions = [...gridCells].map((cell) => ({
      row: Number(cell.dataset.row),
      col: Number(cell.dataset.col),
      left: cell.offsetLeft,
      top: cell.offsetTop,
      w: cell.offsetWidth,
      h: cell.offsetHeight,
    }));

    watchingRef.current?.addEventListener("mousemove", duringDrag);
    watchingRef.current?.addEventListener("mouseup", endDrag);
  };

  const endDrag = () => {
    console.log("Ending drag!");
    updateDragState({ type: "end" });
    watchingRef.current?.removeEventListener("mousemove", duringDrag);
    watchingRef.current?.removeEventListener("mouseup", endDrag);
  };

  const duringDrag = (e: MouseEvent) => {
    debugger;
    cellPositions;
    updateDragState({
      type: "move",
      pos: { x: e.offsetX, y: e.offsetY },
    });
  };

  useEffect(() => {
    watchingRef.current?.addEventListener("itemDrag", startDrag);
    return () =>
      watchingRef.current?.removeEventListener("itemDrag", startDrag);
  }, []);
};
