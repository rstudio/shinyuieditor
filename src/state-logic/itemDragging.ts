import { RefObject } from "preact";
import { useEffect } from "preact/hooks";
import {
  atom,
  atomFamily,
  selector,
  SetterOrUpdater,
  useRecoilCallback,
  useSetRecoilState,
} from "recoil";
import { addItemModalState } from "../components/AddItemModal";
import { enumerateGridDims, sameGridPos } from "../helper-scripts/grid-helpers";
import { boxesOverlap } from "../helper-scripts/overlap-helpers";
import { selectedItemNameState } from "../routes/LayoutEditor";
import { DragDir, GridItemDef, GridPos } from "../types";
import { selectedItemState } from "./gridItems";
import { tractDimsState } from "./gridLayout/atoms";

export type SelectionRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export type ActiveDrag = {
  // These define the type of drag happening and change behavior of snapping, etc
  // accordingly.
  dragBox: { dir: DragDir } & SelectionRect;
  dragType: "NewItemDrag" | "ResizeItemDrag";
  gridCellPositions: GridItemBoundingBox[];
  xOffset: number;
  yOffset: number;
  itemName: string;
  gridPos: GridPos;
};

export type GridItemBoundingBox = SelectionRect &
  GridPos & {
    offsetLeft: number;
    offsetTop: number;
  };

export const dragStateAtom = atom<ActiveDrag | null>({
  key: "dragStateAtom",
  default: null,
});

export function useGridDragger(
  nameOfDragged?: string,
  dragDir: ActiveDrag["dragBox"]["dir"] = "bottomRight"
) {
  const initializeDrag = useRecoilCallback(
    ({ set, snapshot }) =>
      async (mouseDownEvent: MouseEvent) => {
        const dragType: ActiveDrag["dragType"] = nameOfDragged
          ? "ResizeItemDrag"
          : "NewItemDrag";

        let dragBox: ActiveDrag["dragBox"];

        if (nameOfDragged) {
          set(selectedItemNameState, nameOfDragged);

          const itemBBox = await snapshot.getPromise(
            gridItemBoundingBoxFamily(nameOfDragged)
          );
          if (!itemBBox) {
            console.error("Somehow we're dragging on a non existant element");
            return;
          }
          const { left, right, top, bottom } = itemBBox;
          dragBox = {
            dir: dragDir,
            left,
            right,
            top,
            bottom,
          };
        } else {
          const { pageX, pageY } = mouseDownEvent;

          dragBox = {
            dir: dragDir,
            left: pageX,
            right: pageX,
            top: pageY,
            bottom: pageY,
          };
        }
        const gridCellPositions = await snapshot.getPromise(
          gridCellBoundingBoxes
        );
        const gridPos = getDragPosOnGrid(dragBox, gridCellPositions);
        const firstCell = gridCellPositions[0];
        set(dragStateAtom, {
          dragType,
          dragBox,
          gridCellPositions,
          xOffset: firstCell.left - firstCell.offsetLeft,
          yOffset: firstCell.top - firstCell.offsetTop,
          itemName: nameOfDragged ?? "new-item",
          gridPos,
        });

        // Turnoff text selection so dragging doesnt highlight a bunch of stuff
        document.querySelector("body")?.classList.add("disable-text-selection");
        // After we've completed initializing the drag we can start watching the
        // progress of the drag
        document.addEventListener("mousemove", updateDrag);
        document.addEventListener("mouseup", finishDrag);
      },
    []
  );

  const updateDrag = useRecoilCallback(
    ({ set, snapshot }) =>
      async ({ pageX, pageY }: MouseEvent) => {
        const dragState = await snapshot.getPromise(dragStateAtom);
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

        if (shouldUpdateItemState) {
          set(selectedItemState, (existingItemDef) => {
            if (!existingItemDef) return null;
            return {
              ...existingItemDef,
              ...newGridPos,
            };
          });
        }
        set(dragStateAtom, {
          ...dragState,
          dragBox: dragBox,
          gridPos: newGridPos,
        });
      },
    []
  );

  const finishDrag = useRecoilCallback(
    ({ set, reset, snapshot }) =>
      async () => {
        const finalState = await snapshot.getPromise(dragStateAtom);

        if (finalState?.dragType === "NewItemDrag") {
          set(addItemModalState, finalState.gridPos);
        }
        reset(dragStateAtom);
        reset(selectedItemNameState);

        document
          .querySelector("body")
          ?.classList.remove("disable-text-selection");
        document.removeEventListener("mousemove", updateDrag);
      },
    []
  );

  // Make sure we dont have any memory leaks by accidentally leaving event listeners on
  useEffect(() => {
    return () => {
      document.removeEventListener("mouseup", finishDrag);
      document.removeEventListener("mousemove", updateDrag);
    };
  }, []);

  return initializeDrag;
}

// These keep the bounding boxes for items for overlap detection etc.
// Allows us to not have to pass around refs to get the info
const defaultBBox = {
  top: -1,
  bottom: -1,
  left: -1,
  right: -1,
  startRow: 0,
  startCol: 0,
  offsetLeft: 0,
  offsetTop: 0,
};
export const gridItemBoundingBoxFamily = atomFamily<
  GridItemBoundingBox,
  string
>({
  key: "gridItemBoundingBoxFamily",
  default: defaultBBox,
});

export const gridCellBoundingBoxFamily = atomFamily<
  GridItemBoundingBox,
  { row: number; col: number }
>({
  key: "gridCellBoundingBoxFamily",
  default: defaultBBox,
});

export const gridCellBoundingBoxes = selector<GridItemBoundingBox[]>({
  key: "gridCellBoundingBoxes",
  get: ({ get }) => {
    const { numRows, numCols } = get(tractDimsState);

    return enumerateGridDims({
      numRows,
      numCols,
    }).map(({ row, col }) => get(gridCellBoundingBoxFamily({ col, row })));
  },
});

export function useGridCellBoundingBoxRecorder({
  row,
  col,
  cellRef,
}: {
  row: number;
  col: number;
  cellRef: RefObject<HTMLDivElement>;
}) {
  const setBoundingBox = useSetRecoilState(
    gridCellBoundingBoxFamily({ row, col })
  );

  useGridBoundingBoxRecorder({
    itemRef: cellRef,
    startRow: row,
    startCol: col,
    setBoundingBox,
  });
}
export function useGridItemBoundingBoxRecorder({
  itemRef,
  name,
  startRow,
  startCol,
  endRow,
  endCol,
}: {
  itemRef: RefObject<HTMLDivElement>;
} & GridItemDef) {
  const setBoundingBox = useSetRecoilState(gridItemBoundingBoxFamily(name));

  useGridBoundingBoxRecorder({
    itemRef,
    startRow,
    startCol,
    endRow,
    endCol,
    setBoundingBox,
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const itemDiv = itemRef.current;
      if (itemDiv) {
        const { top, bottom, left, right } = itemDiv.getBoundingClientRect();
        const { offsetLeft, offsetTop } = itemDiv;
        setBoundingBox({
          top,
          bottom,
          left,
          right,
          offsetLeft,
          offsetTop,
          startRow,
          endRow,
          startCol,
          endCol,
        });
      }
    });
    if (itemRef.current) resizeObserver.observe(itemRef.current);
    return () => {
      if (itemRef.current) resizeObserver.unobserve(itemRef.current);
    };
  }, []);
}

function useGridBoundingBoxRecorder({
  itemRef,
  startRow,
  startCol,
  endRow,
  endCol,
  setBoundingBox,
}: {
  itemRef: RefObject<HTMLDivElement>;
  setBoundingBox: SetterOrUpdater<GridItemBoundingBox>;
} & GridPos) {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const itemDiv = itemRef.current;
      if (itemDiv) {
        const { top, bottom, left, right } = itemDiv.getBoundingClientRect();
        const { offsetLeft, offsetTop } = itemDiv;
        setBoundingBox({
          top,
          bottom,
          left,
          right,
          offsetLeft,
          offsetTop,
          startRow,
          endRow,
          startCol,
          endCol,
        });
      }
    });
    if (itemRef.current) resizeObserver.observe(itemRef.current);
    return () => {
      if (itemRef.current) resizeObserver.unobserve(itemRef.current);
    };
  }, []);
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
