import type { RefObject } from "preact";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
} from "preact/hooks";
import { useSetRecoilState } from "recoil";
import { GridItem } from "../components/GridItem";
import { sameGridPos } from "../helper-scripts/grid-helpers";
import { boxesOverlap } from "../helper-scripts/overlap-helpers";
import { DragDir, GridCellPos, GridPos } from "../types";
import { gridItemsState, moveItem } from "./layout-updating-logic";

type DragBox = {
  dir: DragDir;
  top: number;
  bottom: number;
  left: number;
  right: number;
};
// When dragging is actively happening then we will have an object with all the
// neccesary info to infer state from it
type ActiveDrag = {
  // These define the type of drag happening and change behavior of snapping, etc
  // accordingly.
  dragBox: DragBox;
  dragType: "NewItemDrag" | "ResizeItemDrag";
  gridCellPositions: GridCellPos[];
  xOffset: number;
  yOffset: number;
  itemName?: string;
  gridPos: GridPos;
};

// Non-active drags will just be represented by null
type DragState = ActiveDrag | null;

// Basic information about a given drag event. Just a subset of the position
// info given by MouseEvent
type DragLocation = {
  pageX: number;
  pageY: number;
};

type ItemDragStart = {
  loc: DragLocation;
  dragDir: DragBox["dir"];
  dragType: ActiveDrag["dragType"];
  name?: string;
  itemRef?: RefObject<HTMLDivElement>;
  gridCellPositions: ActiveDrag["gridCellPositions"];
};

// This is the data given to us by the DragStart callback. We later add the
// gridCellPositions
type DragStartEventDetails = Omit<ItemDragStart, "gridCellPositions">;
export type DragKickoffFn = (
  e: MouseEvent,
  info: Omit<DragStartEventDetails, "loc">
) => void;

// This is called within the reducer
function initDragState({
  loc,
  dragDir,
  dragType,
  name,
  itemRef,
  gridCellPositions,
}: ItemDragStart): ActiveDrag {
  let dragBox: DragBox;

  switch (dragType) {
    case "NewItemDrag":
      dragBox = {
        dir: dragDir,
        left: loc.pageX,
        right: loc.pageX,
        top: loc.pageY,
        bottom: loc.pageY,
      };
      break;
    case "ResizeItemDrag": {
      const gridItem = itemRef?.current;

      if (!gridItem)
        throw new Error(
          "Somehow we're editing an item that does not exist on the page"
        );
      const { left, right, top, bottom } = gridItem.getBoundingClientRect();
      dragBox = {
        dir: dragDir,
        left,
        right,
        top,
        bottom,
      };
    }
  }

  const firstCell = gridCellPositions[0];
  return {
    dragType,
    dragBox,
    gridCellPositions,
    xOffset: firstCell.left - firstCell.offsetLeft,
    yOffset: firstCell.top - firstCell.offsetTop,
    itemName: name,
    gridPos: dragPosOnGrid(dragBox, gridCellPositions),
  };
}

function moveDragState(dragState: DragState, { pageX, pageY }: DragLocation) {
  if (!dragState) throw new Error("Cant move an uninitialized drag");
  const { dragBox: oldDragBox, gridCellPositions } = dragState;
  const dragDir = oldDragBox.dir;
  const dragBox = { ...oldDragBox };

  // Make sure that we update the drag correctly based on the current handle
  if (containsDir("bottom", dragDir)) {
    dragBox.bottom = Math.max(pageY, dragBox.top);
  }
  if (containsDir("top", dragDir)) {
    dragBox.top = Math.min(pageY, dragBox.bottom);
  }
  if (containsDir("right", dragDir)) {
    dragBox.right = Math.max(pageX, dragBox.left);
  }
  if (containsDir("left", dragDir)) {
    dragBox.left = Math.min(pageX, dragBox.right);
  }

  return {
    ...dragState,
    dragBox: dragBox,
    gridPos: dragPosOnGrid(dragBox, gridCellPositions),
  };
}

type DragUpdateActions =
  | { type: "start"; payload: ItemDragStart }
  | { type: "move"; payload: DragLocation }
  | { type: "end" };

function dragUpdater(dragState: DragState, action: DragUpdateActions) {
  switch (action.type) {
    case "start":
      return initDragState(action.payload);
    case "move":
      return moveDragState(dragState, action.payload);
    case "end":
      return null;
    default:
      throw new Error("Unexpected action");
  }
}

// So we dont accidentally emit and listen to different custom events
const CUSTOM_DRAG_START = "GridDragStart";
const CUSTOM_DRAG_END = "GridDragEnd";

export const useDragHandler = ({
  watchingRef,
  onNewItem,
}: {
  watchingRef: RefObject<HTMLDivElement>;
  onNewItem: (pos: GridPos) => void;
}) => {
  const setItems = useSetRecoilState(gridItemsState);
  const [dragState, updateDragState] = useReducer(dragUpdater, null);

  // Create a mutable state object that our callback can use. This way we dont
  // need to keep adding and removing event listeners for each version of the
  // state that we get. A semi-annoying downside of hooks

  const stateRef = useRef<typeof dragState>(dragState);
  const onDone = useCallback(() => {
    const finalState = stateRef.current;
    if (finalState === null)
      throw new Error("For some reason our final state is null");

    if (finalState.dragType === "NewItemDrag") {
      onNewItem(finalState.gridPos);
      console.log("Create a new item!", stateRef.current);
    }
  }, [dragState?.gridPos]);

  const startDrag = useCallback((e: Event | CustomEvent) => {
    if (!(e instanceof CustomEvent)) throw new Error("not a custom event");

    updateDragState({
      type: "start",
      payload: {
        ...(e.detail as DragStartEventDetails),
        gridCellPositions: gatherCellPositions(watchingRef),
      },
    });

    // Turnoff text selection so dragging doesnt highlight a bunch of stuff
    watchingRef.current?.classList.add("disable-text-selection");
    watchingRef.current?.addEventListener("mousemove", duringDrag);
    watchingRef.current?.addEventListener("mouseup", endDrag);
  }, []);

  const duringDrag = useCallback((e: MouseEvent) => {
    updateDragState({
      type: "move",
      payload: e,
    });
  }, []);

  const endDrag = useCallback(() => {
    updateDragState({ type: "end" });

    // trigger end of drag event
    watchingRef.current?.dispatchEvent(new CustomEvent(CUSTOM_DRAG_END));
    watchingRef.current?.classList.remove("disable-text-selection");
    watchingRef.current?.removeEventListener("mousemove", duringDrag);
    watchingRef.current?.removeEventListener("mouseup", endDrag);
  }, []);

  useEffect(() => {
    if (
      dragState?.dragType === "ResizeItemDrag" &&
      dragState.itemName &&
      !sameGridPos(stateRef.current?.gridPos, dragState.gridPos)
    ) {
      moveItem(setItems, {
        name: dragState.itemName,
        ...(dragState.gridPos as GridPos),
      });
    }

    stateRef.current = dragState;
  }, [dragState?.gridPos]);

  // Because this relies on the position of the current grid cells we want
  // useLayoutEffect instead of simply useEffect. If we stick with plain
  // useEffect sometimes this fires before the grid cells are loaded on the page
  // it gets mad at us.
  useLayoutEffect(() => {
    watchingRef.current?.addEventListener(CUSTOM_DRAG_END, onDone);
    watchingRef.current?.addEventListener(CUSTOM_DRAG_START, startDrag);
    return () => {
      // Make sure to remove all event listeners on cleanup. Even though
      // it's unlikely that the mousemove and mouseup events are still attached
      watchingRef.current?.removeEventListener(CUSTOM_DRAG_END, onDone);
      watchingRef.current?.removeEventListener(CUSTOM_DRAG_START, startDrag);
      watchingRef.current?.removeEventListener("mousemove", duringDrag);
      watchingRef.current?.removeEventListener("mouseup", endDrag);
    };
  }, []);

  // This gets passed around a lot and barely ever changes so memoize it
  const triggerStartDrag: DragKickoffFn = useCallback(
    ({ pageX, pageY }, { dragType, dragDir, name, itemRef }) => {
      (watchingRef.current as HTMLDivElement).dispatchEvent(
        new CustomEvent<DragStartEventDetails>(CUSTOM_DRAG_START, {
          bubbles: true,
          detail: {
            name,
            loc: { pageX, pageY },
            dragType,
            dragDir,
            itemRef,
          },
        })
      );
    },
    [watchingRef]
  );

  return {
    dragState,
    startDrag: triggerStartDrag,
  };
};

// I wish that I could bundle this in with the custom useDragHandler hook
// but then we loose a lot of performance because react rerenders the whole
// component at all times instead of just updating the styles when it's its
// own independent component
export const DragFeedback = ({ dragState }: { dragState: DragState }) => {
  if (!dragState) return <div style={{ display: "none" }}></div>;

  const {
    dragBox: { left, right, top, bottom },
    xOffset,
    yOffset,
    gridPos,
    dragType: type,
  } = dragState;

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: `${top - yOffset}px`,
          left: `${left - xOffset}px`,
          width: `${Math.abs(right - left)}px`,
          height: `${Math.abs(top - bottom)}px`,
          pointerEvents: "none",
          outline: `3px solid ${
            dragState.dragType === "ResizeItemDrag" ? "red" : "blue"
          }`,
        }}
      />
      {type === "NewItemDrag" ? (
        <GridItem
          {...gridPos}
          styles={{
            border: "2px solid tomato",
          }}
        />
      ) : null}
    </>
  );
};

function dragPosOnGrid(
  dragBox: DragBox,
  gridCells: Array<GridCellPos>
): GridPos {
  // Reset bounding box definitions so we only use current selection extent
  let startCol: number | null = null;
  let startRow: number | null = null;
  let endCol: number | null = null;
  let endRow: number | null = null;

  (gridCells as GridCellPos[]).forEach(function (cellPosition) {
    // Find if cell overlaps current selection
    // If it does update the bounding box extents
    // Cell is overlapped by selection box
    const overlapsCell = boxesOverlap(cellPosition, dragBox);

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
    startRow: startRow ?? 1,
    endRow: (endRow ?? 1) + 1,
    startCol: startCol ?? 1,
    endCol: (endCol ?? 1) + 1,
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

function containsDir(
  dir: "top" | "bottom" | "left" | "right",
  mainDir: DragDir
): boolean {
  if (dir === mainDir) return true;
  switch (dir) {
    case "top":
      return mainDir === "topLeft" || mainDir === "topRight";
    case "left":
      return mainDir === "topLeft" || mainDir === "bottomLeft";
    case "bottom":
      return mainDir === "bottomLeft" || mainDir === "bottomRight";
    case "right":
      return mainDir === "topRight" || mainDir === "bottomRight";
  }
}
