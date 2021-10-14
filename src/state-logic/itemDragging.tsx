// import * as React from "react";
import { newItemInfoAtom } from "components/ConfigureNewItem";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import { atom, useRecoilTransaction_UNSTABLE } from "recoil";
import {
  gridItemAtoms,
  gridItemNames,
  GridItemsAtomFamily,
  selectedItemNameState
} from "state-logic/gridItems";
import { sameGridPos } from "utils/grid-helpers";
import {
  boxesOverlap,
  containsDir,
  getBBoxOfDiv,
  ItemBoundingBox,
  mutateToFixOverlapOfBoxes
} from "utils/overlap-helpers";
import { RecoilGetter } from "utils/RecoilHelperClasses";
import { DragDir, GridItemDef, GridPos } from "../GridTypes";

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

function getCurrentGridCellBounds() {
  const allCells = document.querySelectorAll(
    ".gridCell"
  ) as NodeListOf<HTMLDivElement>;

  // const gridIndicesToBBox = new Map<`row${number}-col${number}`,GridItemBoundingBox>();
  type GridIndicesString = `row${number}-col${number}`;
  const gridIndicesToBBox = new Map<GridIndicesString, GridItemBoundingBox>();
  allCells.forEach((cellDiv) => {
    const absolutePos = getBBoxOfDiv(cellDiv);
    if (!absolutePos) throw new Error("GridCells are misbehaving");
    const row = Number(cellDiv.dataset.row);
    const col = Number(cellDiv.dataset.col);

    gridIndicesToBBox.set(`row${row}-col${col}`, {
      ...absolutePos,
      startRow: row,
      startCol: col,
    });
  });

  return gridIndicesToBBox;
}

function getItemGridBounds(
  itemNames: string[],
  get: RecoilGetter<GridItemDef>,
  gridItemAtoms: GridItemsAtomFamily,
  gridCellPositionMap: ReturnType<typeof getCurrentGridCellBounds>
) {
  return itemNames.map((name) => {
    const itemDef = get(gridItemAtoms(name));
    if (!itemDef.endRow || !itemDef.endCol)
      throw new Error("Non-complete item");

    const topLeft = gridCellPositionMap.get(
      `row${itemDef.startRow}-col${itemDef.startCol}`
    );

    const bottomRight = gridCellPositionMap.get(
      `row${itemDef.endRow}-col${itemDef.endCol}`
    );
    if (!topLeft || !bottomRight)
      throw new Error("Failed to retrieve grid cell for item bounds");

    const { top, left } = topLeft;
    const { bottom, right } = bottomRight;

    return {
      name,
      top,
      left,
      bottom,
      right,
    };
  });
}


export function useGridDragger(draggedRef?: RefObject<HTMLDivElement>) {

  const itemBoundsRef = useRef<(SelectionRect & { name: string })[] | null>(
    null
  );
  const initializeDrag = useRecoilTransaction_UNSTABLE(
    ({ get, set, reset }) =>
      (
        { pageX: dragX, pageY: dragY }: React.MouseEvent,
        dragDir: ActiveDrag["dragBox"]["dir"] = "bottomRight"
      ) => {
        // If we're dragging on a specific item, then it's a resize drag
        const dragType: ActiveDrag["dragType"] = draggedRef
          ? "ResizeItemDrag"
          : "NewItemDrag";

        if (dragType === "NewItemDrag") {
          // Make sure we reset our selection if we're making a new element
          // Since we use the this state to get the "nameOfDragged" this needs
          // to be called before we find nameOfDragged.
          reset(selectedItemNameState);
        }

        const gridCellPositionsMap = getCurrentGridCellBounds();
        const gridCellPositions = [...gridCellPositionsMap.values()];
        const nameOfDragged = get(selectedItemNameState);
        const otherItemNames = get(gridItemNames).filter(
          (name) => name !== nameOfDragged
        );
        itemBoundsRef.current = getItemGridBounds(
          otherItemNames,
          get,
          gridItemAtoms,
          gridCellPositionsMap
        );

        // If we're dragging an existing item we set the initial drag box to be
        // that item's outline, otherwise the box starts as a point on click loc
        // We make the box start a tiny bit to the upper left if it's a new item
        // drag so that we dont immediately trigger the cancel drag state that
        // we get when the drag box is of size zero.
        const dragBox: ActiveDrag["dragBox"] = {
          dir: dragDir,
          ...(dragType === "ResizeItemDrag"
            ? getBBoxOfDiv(draggedRef?.current)
            : { left: dragX - 1, right: dragX, top: dragY - 1, bottom: dragY }),
        };

        const firstCell = gridCellPositions[0];
        set(dragStateAtom, {
          dragType,
          dragBox,
          gridCellPositions,
          xOffset: firstCell.left - firstCell.offsetLeft,
          yOffset: firstCell.top - firstCell.offsetTop,
          itemName: nameOfDragged ?? "new-item",
          gridPos: getDragPosOnGrid(dragBox, gridCellPositions),
        });

        // Turnoff text selection so dragging doesnt highlight a bunch of stuff
        document.querySelector("body")?.classList.add("disable-text-selection");
        // After we've completed initializing the drag we can start watching the
        // progress of the drag
        document.addEventListener("mousemove", updateDrag);
        document.addEventListener("mouseup", finishDrag, {once: true});
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
        if (containsDir(dragDir, "bottom")) {
          dragBox.bottom = Math.max(pageY, dragBox.top);
        }
        if (containsDir(dragDir, "top")) {
          dragBox.top = Math.min(pageY, dragBox.bottom);
        }
        if (containsDir(dragDir, "right")) {
          dragBox.right = Math.max(pageX, dragBox.left);
        }
        if (containsDir(dragDir, "left")) {
          dragBox.left = Math.min(pageX, dragBox.right);
        }

        // Check to see if we overlap with an existing grid item and constrain
        // the drag if it does
        const itemBounds = itemBoundsRef.current;
        if (itemBounds && itemBounds !== null) {
          itemBounds.forEach((bounds) => {
            const overlap = boxesOverlap(bounds, dragBox);
            if (overlap) {
              mutateToFixOverlapOfBoxes(dragBox, bounds, overlap);
            }
          });
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
          // If the drag is not wanted, which we intepret as a size-zero drag box,
          // then we dont want to actually create a new item.
          const zeroSizeDrag =
            finalState.dragBox.bottom === finalState.dragBox.top &&
            finalState.dragBox.left === finalState.dragBox.right;

            
          if (!zeroSizeDrag) {
            set(newItemInfoAtom, finalState.gridPos);
          }
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
      document.removeEventListener("mousemove", updateDrag);
    };
  }, [finishDrag, updateDrag]);

  return initializeDrag;
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
