import { createContext, RefObject } from "preact";
import { useContext, useEffect, useReducer, useRef } from "preact/hooks";
import { boxesOverlap } from "../helper-scripts/overlap-helpers";
import { DragDir, GridCellPos, GridPos, SelectionRect } from "../types";

// Basic information about a given drag event. Just a subset of the position
// info given by MouseEvent
interface DragInfo {
  pageX: number;
  pageY: number;
  offsetX: number;
  offsetY: number;
}

interface ItemDragStart extends DragInfo {
  name: string;
  dir: DragDir;
}

export type ItemDragStartEvent = CustomEvent<ItemDragStart>;

export type DragPos = {
  XStart: number;
  YStart: number;
  XCurrent: number;
  YCurrent: number;
  XOffset: number;
  YOffset: number;
  width: number;
  height: number;
};

const startDragState = ({
  pageX,
  pageY,
  offsetX,
  offsetY,
}: DragInfo): DragPos => {
  return {
    XStart: pageX,
    XCurrent: pageX,
    XOffset: pageX - offsetX,
    YStart: pageY,
    YCurrent: pageY,
    YOffset: pageY - offsetY,
    height: 0,
    width: 0,
  };
};

const moveDragState = (
  oldPos: DragPos,
  { pageX, pageY }: DragInfo
): DragPos => {
  if (oldPos === null) return oldPos;
  return {
    ...oldPos,
    XCurrent: pageX,
    YCurrent: pageY,
    width: pageX - oldPos.XStart,
    height: pageY - oldPos.YStart,
  };
};

type DragUpdateActions =
  | {
      type: "start";
      info: DragInfo;
    }
  | {
      type: "end";
    }
  | {
      type: "move";
      info: DragInfo;
    };

export const dragUpdater = (
  currentDragPos: DragPos,
  action: DragUpdateActions
) => {
  switch (action.type) {
    case "start":
      return startDragState(action.info);
    case "end":
      return null;
    case "move":
      return moveDragState(currentDragPos, action.info);
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

function isCustomEvent(event: Event): event is CustomEvent {
  return "detail" in event;
}

function getDragExtentOnGrid(
  gridCellPositions: GridCellPos[],
  dragState: DragPos
): GridPos {
  const dragRect: SelectionRect = {
    left: Math.min(dragState.XStart, dragState.XCurrent),
    right: Math.max(dragState.XStart, dragState.XCurrent),
    top: Math.min(dragState.YStart, dragState.YCurrent),
    bottom: Math.max(dragState.YStart, dragState.YCurrent),
  };
  // Reset bounding box definitions so we only use current selection extent
  let startCol: number | null = null;
  let startRow: number | null = null;
  let endCol: number | null = null;
  let endRow: number | null = null;

  gridCellPositions.forEach(function (cellPosition) {
    // Find if cell overlaps current selection
    // If it does update the bounding box extents
    // Cell is overlapped by selection box
    const overlapsCell = boxesOverlap(cellPosition, dragRect);

    if (overlapsCell) {
      const elRow: number = cellPosition.row;
      const elCol: number = cellPosition.col;
      debugger;
      console.log(`Overlaps with row:${elRow} and col:${elCol}`);
      startRow = Math.min(startRow ?? Infinity, elRow);
      endRow = Math.max(endRow ?? -1, elRow);
      startCol = Math.min(startCol ?? Infinity, elCol);
      endCol = Math.max(endCol ?? -1, elCol);
    }
  });

  // These will always be numbers the fallback should never be needed. It's just
  // so typescript is happy
  return {
    rows: [startRow ?? 1, endRow ?? 1],
    cols: [startCol ?? 1, endCol ?? 1],
  };
}

export const useDragHandler = ({
  watchingRef,
}: {
  watchingRef: RefObject<HTMLDivElement>;
}) => {
  // const [dragState, updateDragState] = useReducer(dragUpdater, null);

  const cellPositionsRef = useRef<Array<GridCellPos>>([]);

  // TODO: Add a new reference to keep track of the current drag extent
  // just like DragUpdateDispatch does so it can be passed to getDragExtentOnGrid()
  // to figure out the current grid snap
  useEffect(() => {
    let dragState: DragPos;

    console.log("Initializing drag handler");
    const startDrag = (e: Event) => {
      if (!isCustomEvent(e)) throw new Error("not a custom event");
      console.log("--startDrag()");
      dragState = startDragState(e.detail as ItemDragStart);

      // updateDragState({
      //   type: "start",
      //   info: e.detail as ItemDragStart,
      // });
      const gridCells = watchingRef.current?.querySelectorAll(
        ".gridCell"
      ) as NodeListOf<HTMLDivElement>;

      cellPositionsRef.current = [...gridCells].map((cell) => ({
        row: Number(cell.dataset.row),
        col: Number(cell.dataset.col),
        left: cell.offsetLeft,
        top: cell.offsetTop,
        right: cell.offsetLeft + cell.offsetWidth,
        bottom: cell.offsetTop + cell.offsetWidth,
      }));

      watchingRef.current?.addEventListener("mousemove", duringDrag);
      watchingRef.current?.addEventListener("mouseup", endDrag);
    };

    const endDrag = () => {
      console.log("--endDrag()");
      // updateDragState({ type: "end" });
      watchingRef.current?.removeEventListener("mousemove", duringDrag);
      watchingRef.current?.removeEventListener("mouseup", endDrag);
    };

    const duringDrag = (e: MouseEvent) => {
      console.log("--duringDrag()");
      getDragExtentOnGrid(cellPositionsRef.current, dragState);
      // updateDragState({ type: "move", info: e });
    };
    watchingRef.current?.addEventListener("itemDrag", startDrag);
    return () => {
      watchingRef.current?.removeEventListener("itemDrag", startDrag);
      watchingRef.current?.removeEventListener("mousemove", duringDrag);
      watchingRef.current?.removeEventListener("mouseup", endDrag);
    };
  }, []);
};
