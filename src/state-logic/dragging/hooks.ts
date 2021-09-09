import { useEffect } from "preact/hooks";
import { useRecoilCallback } from "recoil";
import { addItemModalState } from "../../components/AddItemModal";
import { sameGridPos } from "../../helper-scripts/grid-helpers";
import { boxesOverlap } from "../../helper-scripts/overlap-helpers";
import { selectedItemNameState } from "../../routes/LayoutEditor";
import { DragDir, GridPos } from "../../types";
import { selectedItemState } from "../gridItems/atoms";
import {
  ActiveDrag,
  dragStateAtom,
  gridCellBoundingBoxes,
  GridItemBoundingBox,
  gridItemBoundingBoxFamily,
} from "./atoms";

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
