import { useEffect } from "preact/hooks";
import {
  atom,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useAddItemModal } from "../components/AddItemModal";
import { GridItem } from "../components/GridItem";
import { boxesOverlap } from "../helper-scripts/overlap-helpers";
import { DragDir, GridPos } from "../types";
import {
  gridCellBoundingBoxes,
  GridItemBoundingBox,
  gridItemBoundingBoxFamily,
  gridItemsState,
} from "./gridItems";

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
  gridCellPositions: GridItemBoundingBox[];
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

type DragInitialization = {
  loc: DragLocation;
  dragDir: DragBox["dir"];
  dragType: ActiveDrag["dragType"];
  name?: string;
};

type ItemDragStart = {
  loc: DragLocation;
  dragDir: DragBox["dir"];
  dragType: ActiveDrag["dragType"];
  name?: string;
  itemBBox?: GridItemBoundingBox;
  gridCellPositions: ActiveDrag["gridCellPositions"];
};

export const dragStateAtom = atom<DragState>({
  key: "dragStateAtom",
  default: null,
});

// This is a simple state object to keep track of if a drag is currently happening on the screen.
export const dragOccuringAtom = atom<DragInitialization | false>({
  key: "dragOccuringAtom",
  default: false,
});

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
  itemBBox,
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
      if (!itemBBox)
        throw new Error(
          "Somehow we're editing an item that does not exist on the page"
        );
      const { left, right, top, bottom } = itemBBox;
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

export const useDragHandler = () => {
  const dragOccuring = useRecoilValue(dragOccuringAtom);
  const setDragState = useSetRecoilState(dragStateAtom);
  const { openAddItemModal } = useAddItemModal();

  // Create a mutable state object that our callback can use. This way we dont
  // need to keep adding and removing event listeners for each version of the
  // state that we get. A semi-annoying downside of hooks

  const startDrag = useRecoilCallback(
    ({ snapshot }) =>
      async ({ loc, dragDir, dragType, name }: DragInitialization) => {
        const gridCellPositions = await snapshot.getPromise(
          gridCellBoundingBoxes
        );

        const itemBBox = name
          ? await snapshot.getPromise(gridItemBoundingBoxFamily(name))
          : undefined;
        setDragState(
          initDragState({
            loc,
            dragDir,
            dragType,
            name,
            itemBBox,
            gridCellPositions,
          })
        );

        // Turnoff text selection so dragging doesnt highlight a bunch of stuff
        document.querySelector("body")?.classList.add("disable-text-selection");
        // After we've completed initializing the drag we can start watching the
        // progress of the drag
        document.addEventListener("mouseup", endDrag);
        document.addEventListener("mousemove", duringDrag);
      },
    []
  );

  const duringDrag = useRecoilCallback(
    ({ set, snapshot }) =>
      (e: MouseEvent) => {
        set(dragStateAtom, (dragState) => {
          const newDragState = moveDragState(dragState, e);
          if (
            newDragState?.dragType === "ResizeItemDrag" &&
            newDragState.itemName
          ) {
            set(gridItemsState(newDragState.itemName), (itemDef) => ({
              ...itemDef,
              ...(newDragState.gridPos as GridPos),
            }));
          }
          return newDragState;
        });
      },
    []
  );

  const endDrag = useRecoilCallback(({ set, snapshot }) => async () => {
    document.removeEventListener("mousemove", duringDrag);
    document.querySelector("body")?.classList.remove("disable-text-selection");

    const finalState = await snapshot.getPromise(dragStateAtom);
    if (finalState?.dragType === "NewItemDrag") {
      openAddItemModal(finalState.gridPos);
    }
    set(dragOccuringAtom, false);
    set(dragStateAtom, null);
  });

  // Because this relies on the position of the current grid cells we want
  // useLayoutEffect instead of simply useEffect. If we stick with plain
  // useEffect sometimes this fires before the grid cells are loaded on the page
  // it gets mad at us.
  useEffect(() => {
    if (dragOccuring) {
      startDrag(dragOccuring);
    }

    document.removeEventListener("mousemove", duringDrag);
    return () => {
      // Make sure to remove all event listeners on cleanup. Even though
      // it's unlikely that the mousemove and mouseup events are still attached
      document.removeEventListener("mousemove", duringDrag);
      document.removeEventListener("mouseup", endDrag);
    };
  }, [dragOccuring]);
};

// I wish that I could bundle this in with the custom useDragHandler hook
// but then we loose a lot of performance because react rerenders the whole
// component at all times instead of just updating the styles when it's its
// own independent component
export const DragFeedback = () => {
  // Initiate the drag watching behavior for new elements (see useEffect() below)
  // and also the existing elements being resized
  useDragHandler();

  const dragState = useRecoilValue(dragStateAtom);

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
  gridCells: GridItemBoundingBox[]
): GridPos {
  // Reset bounding box definitions so we only use current selection extent
  let startCol: number | null = null;
  let startRow: number | null = null;
  let endCol: number | null = null;
  let endRow: number | null = null;

  gridCells.forEach(function (cellPosition) {
    // Find if cell overlaps current selection
    // If it does update the bounding box extents
    // Cell is overlapped by selection box
    const overlapsCell = boxesOverlap(cellPosition, dragBox);

    if (overlapsCell) {
      const elRow: number = cellPosition.startRow;
      const elCol: number = cellPosition.startCol;
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
