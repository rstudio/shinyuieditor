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

export type DragPos = {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
};

export type DragState = {
  gridCells: GridCellPositions;
  dragPos?: DragPos;
  gridPos?: GridPos;
  xOffset: number;
  yOffset: number;
};

function dragUpdater(dragState: DragState | null, action: DragUpdateActions) {
  let info: DragInfo;
  let newState: DragState;
  let dragPos: DragPos;

  switch (action.type) {
    case "start":
      const firstCell = action.cellPositions[0];

      return {
        gridCells: action.cellPositions,
        xOffset: firstCell.left - firstCell.offsetLeft,
        yOffset: firstCell.top - firstCell.offsetTop,
      };
    case "move":
      if (!dragState) throw new Error("Cant move an uninitialized drag");

      info = action.info;
      if (!dragState.dragPos) {
        // this is our first move with this so fill in whole drag position
        dragPos = {
          xStart: info.pageX,
          xEnd: info.pageX,
          yStart: info.pageY,
          yEnd: info.pageY,
        };
      } else {
        // Were already dragging so just update the end positions
        dragPos = {
          ...dragState.dragPos,
          xEnd: info.pageX,
          yEnd: info.pageY,
        };
      }
      newState = { ...dragState, dragPos };
      newState.gridPos = getDragExtentOnGrid(newState);
      return newState;
    case "end":
      // return dragState;
      return null;

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
  dragPos,
  gridCells,
}: {
  dragPos?: DragPos;
  gridCells?: GridCellPositions;
}): GridPos {
  if (!dragPos)
    throw new Error("Need a drag position to find extent on the grid");
  const { xStart, xEnd, yStart, yEnd } = dragPos;
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
