import { RefObject } from "preact";
import { useEffect, useReducer } from "preact/hooks";
import { boxesOverlap } from "../helper-scripts/overlap-helpers";
import { DragDir, GridCellPos, GridPos } from "../types";

// Basic information about a given drag event. Just a subset of the position
// info given by MouseEvent
interface DragInfo {
  pageX: number;
  pageY: number;
  offsetX: number;
  offsetY: number;
}

type DragEvents = "ItemMoveDrag" | "ItemResizeDrag" | "NewItemDrag";

export interface ItemDragStart extends DragInfo {
  name: string;
  dir: DragDir;
}

type GridCellPositions = Array<GridCellPos>;

type DragUpdateActions =
  | {
      type: "start";
      info: DragInfo;
      cellPositions: Array<GridCellPos>;
    }
  | {
      type: "end";
    }
  | {
      type: "move";
      info: DragInfo;
    };

export type ItemDragStartEvent = CustomEvent<ItemDragStart>;

export type DragState = {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
  xOffset: number;
  yOffset: number;
  gridCells?: GridCellPositions;
  gridPos?: GridPos;
};

function dragUpdater(dragState: DragState | null, action: DragUpdateActions) {
  let info: DragInfo;
  let newState: DragState;

  switch (action.type) {
    case "start":
      info = action.info;
      return {
        xStart: info.pageX,
        xEnd: info.pageX,
        yStart: info.pageY,
        yEnd: info.pageY,
        xOffset: info.pageX - info.offsetX,
        yOffset: info.pageY - info.offsetY,
        gridCells: action.cellPositions,
      };
    case "end":
      return dragState;
      return null;
    case "move":
      if (!dragState) throw new Error("Cant move an uninitialized drag");

      newState = {
        ...dragState,
        xEnd: action.info.pageX,
        yEnd: action.info.pageY,
      };
      newState.gridPos = getDragExtentOnGrid(newState);
      return newState;

    default:
      throw new Error("Unexpected action");
  }
}

export const useDragHandler = ({
  dragEventId,
  watchingRef,
}: {
  dragEventId: DragEvents;
  watchingRef: RefObject<HTMLDivElement>;
}) => {
  const [dragState, updateDragState] = useReducer(dragUpdater, null);

  useEffect(() => {
    // const watcherOffset = {
    //   left: watchingRef.current?.offsetLeft,
    //   right: watchingRef.current?.offsetTop,
    // };

    const startDrag = (e: Event) => {
      if (!isCustomEvent(e)) throw new Error("not a custom event");

      updateDragState({
        type: "start",
        info: e.detail as ItemDragStart,
        cellPositions: gatherCellPositions(watchingRef),
      });

      watchingRef.current?.addEventListener("mousemove", duringDrag);
      watchingRef.current?.addEventListener("mouseup", endDrag);
    };

    const duringDrag = (e: MouseEvent) => {
      updateDragState({
        type: "move",
        info: e,
      });
    };
    const endDrag = () => {
      updateDragState({ type: "end" });
      watchingRef.current?.removeEventListener("mousemove", duringDrag);
      watchingRef.current?.removeEventListener("mouseup", endDrag);
    };

    watchingRef.current?.addEventListener(dragEventId, startDrag);
    return () => {
      // Make sure to remove all event listeners on cleanup. Even though
      // it's unlikely that the mousemove and mouseup events are still attached
      watchingRef.current?.removeEventListener("itemDrag", startDrag);
      watchingRef.current?.removeEventListener("mousemove", duringDrag);
      watchingRef.current?.removeEventListener("mouseup", endDrag);
    };
  }, []);

  return dragState;
};

export function triggerCustomDragEvent({
  el,
  type,
  e,
  dir,
  name,
}: {
  el: HTMLDivElement;
  type: DragEvents;
  e: MouseEvent;
  dir: DragDir;
  name: string;
}) {
  console.log(`Triggering custom event ${type}`);
  el.dispatchEvent(
    new CustomEvent<ItemDragStart>(type, {
      bubbles: true,
      detail: {
        name,
        dir,
        pageX: e.pageX,
        offsetX: e.offsetX,
        pageY: e.pageY,
        offsetY: e.offsetY,
      },
    })
  );
}

function getDragExtentOnGrid({
  xStart,
  xEnd,
  yStart,
  yEnd,
  gridCells,
}: DragState): GridPos {
  const dragRect = {
    left: Math.min(xStart, xEnd),
    right: Math.max(xStart, xEnd),
    top: Math.min(yStart, yEnd),
    bottom: Math.max(yStart, yEnd),
  };
  // Reset bounding box definitions so we only use current selection extent
  let startCol: number | null = null;
  let startRow: number | null = null;
  let endCol: number | null = null;
  let endRow: number | null = null;

  (gridCells as GridCellPos[]).forEach(function (cellPosition) {
    // Find if cell overlaps current selection
    // If it does update the bounding box extents
    // Cell is overlapped by selection box
    const overlapsCell = boxesOverlap(cellPosition, dragRect);

    if (overlapsCell) {
      const elRow: number = cellPosition.row;
      const elCol: number = cellPosition.col;
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

function gatherCellPositions(
  watchingRef: RefObject<HTMLDivElement>
): Array<GridCellPos> {
  const gridCells = watchingRef.current?.querySelectorAll(
    ".gridCell"
  ) as NodeListOf<HTMLDivElement>;

  return [...gridCells].map((cell) => ({
    row: Number(cell.dataset.row),
    col: Number(cell.dataset.col),
    left: cell.offsetLeft,
    top: cell.offsetTop,
    right: cell.offsetLeft + cell.offsetWidth,
    bottom: cell.offsetTop + cell.offsetWidth,
  }));
}

function isCustomEvent(event: Event): event is CustomEvent {
  return "detail" in event;
}
