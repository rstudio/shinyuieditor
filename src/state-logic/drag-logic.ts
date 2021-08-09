import { RefObject } from "preact";
import { useEffect, useReducer } from "preact/hooks";
import { boxesOverlap } from "../helper-scripts/overlap-helpers";
import { DragDir, GridCellPos, GridPos } from "../types";

// Basic information about a given drag event. Just a subset of the position
// info given by MouseEvent
interface DragInfo {
  pageX: number;
  pageY: number;
}

export type DragPurpose = "ItemMoveDrag" | "ItemResizeDrag" | "NewItemDrag";

export interface ItemDragStart extends DragInfo {
  name: string;
  type: DragPurpose;
  dir: DragDir;
}

type GridCellPositions = Array<GridCellPos>;

type DragUpdateActions =
  | {
      type: "start";
      callType: DragPurpose;
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
  type: DragPurpose;
  gridCells: GridCellPositions;
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
  xOffset: number;
  yOffset: number;
  gridPos?: GridPos;
};

const customDragEventId = "GridDrag";

function dragUpdater(dragState: DragState | null, action: DragUpdateActions) {
  let firstCell: GridCellPos;
  const { pageX: dragX = 0, pageY: dragY = 0 } =
    action.type !== "end" ? action.info : {};

  switch (action.type) {
    case "start":
      firstCell = action.cellPositions[0];
      return {
        type: action.callType,
        gridCells: action.cellPositions,
        xOffset: firstCell.left - firstCell.offsetLeft,
        yOffset: firstCell.top - firstCell.offsetTop,
        xStart: dragX,
        xEnd: dragX,
        yStart: dragY,
        yEnd: dragY,
      };
    case "move":
      return moveDragState(dragState, action.info);
    case "end":
      return null;

    default:
      throw new Error("Unexpected action");
  }
}

function moveDragState(state: DragState | null, info: DragInfo) {
  if (!state) throw new Error("Cant move an uninitialized drag");

  const { pageX: dragX, pageY: dragY } = info;
  const newState: DragState = { ...state, xEnd: dragX, yEnd: dragY };
  newState.gridPos = getDragExtentOnGrid(newState);
  return newState;
}

export type DragStartFn = (x: {
  e: MouseEvent;
  type: DragPurpose;
  name?: string;
  dir: DragDir;
}) => void;

export const useDragHandler = (watchingRef: RefObject<HTMLDivElement>) => {
  const [dragState, updateDragState] = useReducer(dragUpdater, null);

  useEffect(() => {
    const startDrag = (e: Event) => {
      if (!isCustomEvent(e)) throw new Error("not a custom event");

      const eventInfo = e.detail as ItemDragStart;

      updateDragState({
        type: "start",
        callType: eventInfo.type,
        info: eventInfo,
        cellPositions: gatherCellPositions(watchingRef),
      });

      // Turnoff text selection so dragging doesnt highlight a bunch of stuff
      watchingRef.current?.classList.add("disable-text-selection");
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

      watchingRef.current?.classList.remove("disable-text-selection");
      watchingRef.current?.removeEventListener("mousemove", duringDrag);
      watchingRef.current?.removeEventListener("mouseup", endDrag);
    };

    watchingRef.current?.addEventListener(customDragEventId, startDrag);
    return () => {
      // Make sure to remove all event listeners on cleanup. Even though
      // it's unlikely that the mousemove and mouseup events are still attached
      watchingRef.current?.removeEventListener("itemDrag", startDrag);
      watchingRef.current?.removeEventListener("mousemove", duringDrag);
      watchingRef.current?.removeEventListener("mouseup", endDrag);
    };
  }, []);

  const startDrag: DragStartFn = ({ e, type, name = "new", dir }) => {
    (watchingRef.current as HTMLDivElement).dispatchEvent(
      new CustomEvent<ItemDragStart>(customDragEventId, {
        bubbles: true,
        detail: {
          name,
          type,
          dir,
          pageX: e.pageX,
          pageY: e.pageY,
        },
      })
    );
  };

  return { dragState, startDrag };
};

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

  return [...gridCells].map((cell) => {
    const { left, right, top, bottom } = cell.getBoundingClientRect();
    return {
      row: Number(cell.dataset.row),
      col: Number(cell.dataset.col),
      left,
      top,
      right,
      bottom,
      offsetLeft: cell.offsetLeft,
      offsetTop: cell.offsetTop,
    };
  });
}

function isCustomEvent(event: Event): event is CustomEvent {
  return "detail" in event;
}
