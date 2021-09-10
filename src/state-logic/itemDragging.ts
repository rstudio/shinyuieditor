import { RefObject } from "preact";
import { useEffect } from "preact/hooks";
import { atom, useRecoilTransaction_UNSTABLE } from "recoil";
import { addItemModalState } from "../components/AddItemModal";
import { sameGridPos } from "../helper-scripts/grid-helpers";
import {
  boxesOverlap,
  getBBoxOfDiv,
  ItemBoundingBox,
} from "../helper-scripts/overlap-helpers";
import { DragDir, GridPos } from "../types";
import { gridItemAtoms, selectedItemNameState } from "./gridItems";

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

export type GridItemBoundingBox = ItemBoundingBox & GridPos;

export const dragStateAtom = atom<ActiveDrag | null>({
  key: "dragStateAtom",
  default: null,
});

function getCurrentGridCellBounds(): GridItemBoundingBox[] {
  const allCells = document.querySelectorAll(
    ".gridCell"
  ) as NodeListOf<HTMLDivElement>;
  const cellBBoxes = [...allCells].map((cellDiv) => {
    const absolutePos = getBBoxOfDiv(cellDiv);
    if (!absolutePos) throw "GridCells are misbehaving";
    return {
      ...absolutePos,
      startRow: Number(cellDiv.dataset.row),
      startCol: Number(cellDiv.dataset.col),
    };
  });

  return cellBBoxes;
}

export function useGridDragger(
  nameOfDragged?: string,
  draggedRef?: RefObject<HTMLDivElement>
) {
  const initializeDrag = useRecoilTransaction_UNSTABLE(
    ({ set }) =>
      (
        mouseDownEvent: MouseEvent,
        dragDir: ActiveDrag["dragBox"]["dir"] = "bottomRight"
      ) => {
        const dragType: ActiveDrag["dragType"] = nameOfDragged
          ? "ResizeItemDrag"
          : "NewItemDrag";

        let dragBox: ActiveDrag["dragBox"];

        if (nameOfDragged && draggedRef) {
          const divBBox = getBBoxOfDiv(draggedRef.current);

          if (!divBBox) {
            console.error("Somehow we're dragging on a non existant element");
            return;
          }
          const { left, right, top, bottom } = divBBox;
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

        const gridCellPositions = getCurrentGridCellBounds();
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

  const updateDrag = useRecoilTransaction_UNSTABLE(
    ({ set, get }) =>
      ({ pageX, pageY }: MouseEvent) => {
        const dragState = get(dragStateAtom);
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

        const selectedItemName = get(selectedItemNameState);
        if (shouldUpdateItemState && selectedItemName) {
          set(gridItemAtoms(selectedItemName), (existingItemDef) => {
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

  const finishDrag = useRecoilTransaction_UNSTABLE(
    ({ set, reset, get }) =>
      () => {
        const finalState = get(dragStateAtom);

        if (finalState?.dragType === "NewItemDrag") {
          set(addItemModalState, finalState.gridPos);
        }
        reset(dragStateAtom);

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
