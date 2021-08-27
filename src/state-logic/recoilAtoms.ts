import { atom, atomFamily, selector } from "recoil";
import { enumerateGridDims } from "../helper-scripts/grid-helpers";
import {
  CSSMeasure,
  DragDir,
  GridItemDef,
  GridLayoutTemplate,
  GridPos,
} from "../types";

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

export type GridTractDefs = CSSMeasure[];
export type GridTracts = Pick<GridLayoutTemplate, "rows" | "cols">;

export const gridRowsState = atom<GridTractDefs>({
  key: "gridRowsState",
  default: ["1fr"],
});
export const gridColsState = atom<GridTractDefs>({
  key: "gridColsState",
  default: ["1fr"],
});

export const gapState = atom({
  key: "gapState", // unique ID (with respect to other atoms/selectors)
  default: "1rem", // default value (aka initial value)
});
export const dragStateAtom = atom<DragState>({
  key: "dragStateAtom",
  default: null,
});

export const itemNamesState = atom<string[]>({
  key: "itemNamesState",
  default: [],
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
    const itemNames = get(itemNamesState);
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
    const rows = get(gridRowsState);
    const cols = get(gridColsState);

    return enumerateGridDims({
      numRows: rows.length,
      numCols: cols.length,
    }).map(({ row, col }) => get(gridCellBoundingBoxFamily({ col, row })));
  },
});

export const gridItemsState = atomFamily<GridItemDef, string>({
  key: "gridItemsState",
  default: {
    name: "default",
    startRow: 1,
    endRow: 1,
    startCol: 1,
    endCol: 1,
  },
});
