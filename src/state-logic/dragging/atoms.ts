import { atom, atomFamily, DefaultValue, selector } from "recoil";
import { enumerateGridDims } from "../../helper-scripts/grid-helpers";
import { boxesOverlap } from "../../helper-scripts/overlap-helpers";
import { selectedItemNameState } from "../../routes/LayoutEditor";
import { DragDir, GridPos } from "../../types";
import { gridItemNames } from "../gridItems/atoms";
import { tractDimsState } from "../gridLayout/atoms";

// When dragging is actively happening then we will have an object with all the
// neccesary info to infer state from it

export type DragLocation = {
  pageX: number;
  pageY: number;
};

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

export type DragState = ActiveDrag | null;

export type GridItemBoundingBox = SelectionRect &
  GridPos & {
    offsetLeft: number;
    offsetTop: number;
  };

export const dragStateAtom = atom<DragState>({
  key: "dragStateAtom",
  default: null,
});

type DragInitialization = {
  mouseDownEvent: MouseEvent;
  nameOfDragged: string | null;
  dragDir?: ActiveDrag["dragBox"]["dir"];
  dragType: ActiveDrag["dragType"];
};

export const initializeDragState = selector<DragInitialization | null>({
  key: "initializeDrag",
  get: () => null,
  set: ({ get, set }, info) => {
    if (info instanceof DefaultValue || info === null) return;
    const { nameOfDragged, dragDir = "bottomRight", dragType } = info;
    let dragBox: ActiveDrag["dragBox"];

    if (nameOfDragged) {
      set(selectedItemNameState, nameOfDragged);

      const itemBBox = get(gridItemBoundingBoxFamily(nameOfDragged));
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
      const { pageX, pageY } = info.mouseDownEvent;

      dragBox = {
        dir: dragDir,
        left: pageX,
        right: pageX,
        top: pageY,
        bottom: pageY,
      };
    }

    const gridCellPositions = get(gridCellBoundingBoxes);
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
  },
});

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
// Collapses the grid item bounds to a single array
const gridItemBoundingBoxes = selector<GridItemBoundingBox[]>({
  key: "gridItemBoundingBoxes",
  get: ({ get }) => {
    const itemNames = get(gridItemNames);
    return itemNames.map((name) => get(gridItemBoundingBoxFamily(name)));
  },
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
