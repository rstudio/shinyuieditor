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

function dragUpdater(
  currentDragPos: DragState | null,
  action: DragUpdateActions
) {
  switch (action.type) {
    case "start":
      return startDragState(action.info, action.cellPositions);
    case "end":
      return null;
    case "move":
      if (!currentDragPos) throw new Error("Cant move an uninitialized drag");
      return moveDragState(currentDragPos, action.info);
    default:
      throw new Error("Unexpected action");
  }
}

function startDragState(
  { pageX, pageY, offsetX, offsetY }: DragInfo,
  cellPositions: GridCellPositions
): DragState {
  return {
    xStart: pageX,
    xEnd: pageX,
    yStart: pageY,
    yEnd: pageY,
    xOffset: pageX - offsetX,
    yOffset: pageY - offsetY,
    gridCells: cellPositions,
  };
}

function moveDragState(
  oldState: DragState,
  { pageX, pageY }: DragInfo
): DragState {
  if (oldState === null || oldState.gridCells === undefined)
    throw new Error("Drag state is somehow missing current grid positions");

  const newState = {
    ...oldState,
    xEnd: pageX,
    yEnd: pageY,
  };
  newState.gridPos = getDragExtentOnGrid(newState);
  return newState;
}

function isCustomEvent(event: Event): event is CustomEvent {
  return "detail" in event;
}

export const useDragHandler = ({
  watchingRef,
}: {
  watchingRef: RefObject<HTMLDivElement>;
}) => {
  const [dragState, updateDragState] = useReducer(dragUpdater, null);

  useEffect(() => {
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

    const endDrag = () => {
      updateDragState({ type: "end" });
      watchingRef.current?.removeEventListener("mousemove", duringDrag);
      watchingRef.current?.removeEventListener("mouseup", endDrag);
    };

    const duringDrag = (e: MouseEvent) => {
      updateDragState({
        type: "move",
        info: e,
      });
    };
    watchingRef.current?.addEventListener("itemDrag", startDrag);
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
