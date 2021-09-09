import { useCallback, useEffect } from "preact/hooks";
import {
  DefaultValue,
  selector,
  useRecoilCallback,
  useSetRecoilState,
} from "recoil";
import { useAddItemModalOpener } from "../../components/AddItemModal";
import { sameGridPos } from "../../helper-scripts/grid-helpers";
import { boxesOverlap } from "../../helper-scripts/overlap-helpers";
import { selectedItemNameState } from "../../routes/LayoutEditor";
import { DragDir, GridPos } from "../../types";
import { selectedItemState } from "../gridItems/atoms";
import {
  ActiveDrag,
  DragLocation,
  DragState,
  dragStateAtom,
  GridItemBoundingBox,
  initializeDragState,
} from "./atoms";

const moveGridItem = selector<GridPos | null>({
  key: "moveGridItem",
  get: ({ get }) => get(selectedItemState),
  set: ({ get, set }, newItemPos) => {
    // Make sure we have a selected item
    const existingItemDef = get(selectedItemState);
    if (!existingItemDef || !newItemPos) return;
    if (newItemPos instanceof DefaultValue) return;

    set(selectedItemState, {
      ...existingItemDef,
      ...newItemPos,
    });
  },
});

export function useGridDragger(opts: { nameOfDragged?: string }) {
  const { nameOfDragged = null } = opts;
  const openAddItemModal = useAddItemModalOpener();
  const dragType: ActiveDrag["dragType"] = nameOfDragged
    ? "ResizeItemDrag"
    : "NewItemDrag";

  const setInitialDragState = useSetRecoilState(initializeDragState);

  const onMouseDown = useCallback((e: MouseEvent, dragDir?: DragDir) => {
    e.stopPropagation();
    setInitialDragState({
      mouseDownEvent: e,
      dragDir,
      dragType,
      nameOfDragged,
    });

    // Turnoff text selection so dragging doesnt highlight a bunch of stuff
    document.querySelector("body")?.classList.add("disable-text-selection");
    // After we've completed initializing the drag we can start watching the
    // progress of the drag
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  const onMouseMove = useRecoilCallback(
    ({ set }) =>
      (e: MouseEvent) => {
        set(dragStateAtom, (dragState) => {
          const newDragState = updateDragState(dragState, e);
          set(moveGridItem, newDragState.gridPos as GridPos);
          return newDragState;
        });
      },
    []
  );

  const onMouseUp = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        const finalState = await snapshot.getPromise(dragStateAtom);
        if (finalState?.dragType === "NewItemDrag") {
          openAddItemModal(finalState.gridPos);
        }
        set(dragStateAtom, null);

        document
          .querySelector("body")
          ?.classList.remove("disable-text-selection");
        document.removeEventListener("mousemove", onMouseMove);
        set(selectedItemNameState, null);
      },
    []
  );

  // Make sure we dont have any memory leaks by accidentally leaving event listeners on
  useEffect(() => {
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return onMouseDown;
}

function updateDragState(dragState: DragState, { pageX, pageY }: DragLocation) {
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

  const newGridPos = getDragPosOnGrid(dragBox, gridCellPositions);

  const shouldUpdateItemState =
    dragState.dragType === "ResizeItemDrag" &&
    !sameGridPos(dragState.gridPos, newGridPos);
  return {
    ...dragState,
    dragBox: dragBox,
    gridPos: getDragPosOnGrid(dragBox, gridCellPositions),
    shouldUpdateItemState,
  };
}

function getDragPosOnGrid(
  dragBox: ActiveDrag["dragBox"],
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
    endRow: endRow ?? 1,
    startCol: startCol ?? 1,
    endCol: endCol ?? 1,
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
