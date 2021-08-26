import { useEffect } from "preact/hooks";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { useAddItemModal } from "../components/AddItemModal";
import { GridItem } from "../components/GridItem";
import { boxesOverlap } from "../helper-scripts/overlap-helpers";
import { DragDir, GridPos } from "../types";

import {
  ActiveDrag,
  DragLocation,
  DragState,
  dragStateAtom,
  gridCellBoundingBoxes,
  GridItemBoundingBox,
  gridItemBoundingBoxFamily,
  gridItemsState,
} from "./recoilAtoms";

export function useGridDragger(opts: {
  dragDir?: DragDir;
  nameOfDragged?: string;
}) {
  const { dragDir = "bottomRight", nameOfDragged } = opts;
  const { openAddItemModal } = useAddItemModal();
  const dragType: ActiveDrag["dragType"] = nameOfDragged
    ? "ResizeItemDrag"
    : "NewItemDrag";

  const onMouseDown = useRecoilCallback(
    ({ snapshot, set }) =>
      async (e: MouseEvent) => {
        const { pageX, pageY } = e;
        e.stopPropagation();
        const gridCellPositions = await snapshot.getPromise(
          gridCellBoundingBoxes
        );

        const itemBBox = nameOfDragged
          ? await snapshot.getPromise(gridItemBoundingBoxFamily(nameOfDragged))
          : undefined;

        set(
          dragStateAtom,
          setupInitialDragState({
            loc: { pageX, pageY },
            dragDir,
            dragType,
            name: nameOfDragged,
            itemBBox,
            gridCellPositions,
          })
        );

        // Turnoff text selection so dragging doesnt highlight a bunch of stuff
        document.querySelector("body")?.classList.add("disable-text-selection");
        // After we've completed initializing the drag we can start watching the
        // progress of the drag
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      },
    []
  );

  const onMouseMove = useRecoilCallback(
    ({ set }) =>
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

  const onMouseUp = useRecoilCallback(({ set, snapshot }) => async () => {
    const finalState = await snapshot.getPromise(dragStateAtom);
    if (finalState?.dragType === "NewItemDrag") {
      openAddItemModal(finalState.gridPos);
    }
    set(dragStateAtom, null);

    document.querySelector("body")?.classList.remove("disable-text-selection");
    document.removeEventListener("mousemove", onMouseMove);
  });

  // Make sure we dont have any memory leaks by accidentally leaving event listeners on
  useEffect(() => {
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return onMouseDown;
}
// This is called within the reducer
function setupInitialDragState({
  loc,
  dragDir,
  dragType,
  name,
  itemBBox,
  gridCellPositions,
}: {
  loc: DragLocation;
  dragDir: ActiveDrag["dragBox"]["dir"];
  dragType: ActiveDrag["dragType"];
  name?: string;
  itemBBox?: GridItemBoundingBox;
  gridCellPositions: ActiveDrag["gridCellPositions"];
}): ActiveDrag {
  let dragBox: ActiveDrag["dragBox"];
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

// I wish that I could bundle this in with the custom useDragHandler hook
// but then we loose a lot of performance because react rerenders the whole
// component at all times instead of just updating the styles when it's its
// own independent component
export const DragFeedback = () => {
  // Initiate the drag watching behavior for new elements (see useEffect() below)
  // and also the existing elements being resized
  // useDragHandler();

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
