import { RefObject } from "preact";
import { useLayoutEffect, useReducer } from "preact/hooks";
import { GridItem } from "../components/GridItem";
import { boxesOverlap } from "../helper-scripts/overlap-helpers";
import { DragDir, GridCellPos, GridPos } from "../types";

export type DragPurpose = "ItemMoveDrag" | "ItemResizeDrag" | "NewItemDrag";

// Basic information about a given drag event. Just a subset of the position
// info given by MouseEvent
interface DragInfo {
  pageX: number;
  pageY: number;
}

export interface ItemDragStart extends DragInfo {
  name: string;
  type: DragPurpose;
  dir: DragDir;
}

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

// When dragging is actively happening then we will have an object with all the
// neccesary info to infer state from it
type ActiveDrag = {
  type: DragPurpose;
  gridCells: Array<GridCellPos>;
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
  xOffset: number;
  yOffset: number;
  gridPos: GridPos;
};

// Non-active drags will just be represented by null
type DragState = ActiveDrag | null;

function dragUpdater(dragState: DragState, action: DragUpdateActions) {
  switch (action.type) {
    case "start": {
      const {
        callType,
        info: { pageX: xStart, pageY: yStart },
        cellPositions,
      } = action;
      const firstCell = cellPositions[0];
      return {
        type: callType,
        gridCells: cellPositions,
        xOffset: firstCell.left - firstCell.offsetLeft,
        yOffset: firstCell.top - firstCell.offsetTop,
        xStart,
        yStart,
        xEnd: xStart,
        yEnd: yStart,
        gridPos: dragPosOnGrid({ xStart, yStart, gridCells: cellPositions }),
      };
    }
    case "move": {
      if (!dragState) throw new Error("Cant move an uninitialized drag");

      const { xStart, yStart, gridCells } = dragState;
      const { pageX: xEnd, pageY: yEnd } = action.info;
      return {
        ...dragState,
        xEnd,
        yEnd,
        gridPos: dragPosOnGrid({ xStart, xEnd, yStart, yEnd, gridCells }),
      };
    }
    case "end":
      return null;
    default:
      throw new Error("Unexpected action");
  }
}

export type DragStartFn = (x: {
  e: MouseEvent;
  type: DragPurpose;
  name?: string;
  dir: DragDir;
}) => void;

// So we dont accidentally emit and listen to different custom events
const CUSTOM_DRAG_EVENT = "GridDrag";

export const useDragHandler = (watchingRef: RefObject<HTMLDivElement>) => {
  const [dragState, updateDragState] = useReducer(dragUpdater, null);

  // Because this relies on the position of the current grid cells we want
  // useLayoutEffect instead of simply useEffect. If we stick with plain
  // useEffect sometimes this fires before the grid cells are loaded on the page
  // it gets mad at us.
  useLayoutEffect(() => {
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

    watchingRef.current?.addEventListener(CUSTOM_DRAG_EVENT, startDrag);
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
      new CustomEvent<ItemDragStart>(CUSTOM_DRAG_EVENT, {
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

// I wish that I could bundle this in with the custom useDragHandler hook
// but then we loose a lot of performance because react rerenders the whole
// component at all times instead of just updating the styles when it's its
// own independent component
export const DragFeedback = ({ dragState }: { dragState: DragState }) => {
  if (!dragState) return <div style={{ display: "none" }}></div>;

  const { xStart, xEnd, yStart, yEnd, xOffset, yOffset, gridPos, type } =
    dragState;
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: `${yStart - yOffset}px`,
          left: `${xStart - xOffset}px`,
          width: `${xEnd - xStart}px`,
          height: `${yEnd - yStart}px`,
          pointerEvents: "none",
          outline: `1px solid ${
            dragState.type === "ItemResizeDrag" ? "red" : "blue"
          }`,
        }}
      />
      {type === "NewItemDrag" ? (
        <GridItem
          rows={gridPos.rows}
          cols={gridPos.cols}
          styles={{
            border: "2px solid tomato",
          }}
        />
      ) : null}
    </>
  );
};

function dragPosOnGrid({
  xStart,
  yStart,
  xEnd = xStart,
  yEnd = yStart,
  gridCells,
}: {
  xStart: number;
  yStart: number;
  xEnd?: number;
  yEnd?: number;
  gridCells: Array<GridCellPos>;
}): GridPos {
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
    rows: [startRow ?? 1, (endRow ?? 1) + 1],
    cols: [startCol ?? 1, (endCol ?? 1) + 1],
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
