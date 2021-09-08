import { atom, atomFamily, selector } from "recoil";
import { enumerateGridDims } from "../../helper-scripts/grid-helpers";
import { DragDir, GridPos } from "../../types";
import { tractDimsState } from "../gridLayout/atoms";
import { gridItemNames } from "../gridItems/atoms";

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
