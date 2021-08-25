import { RefObject } from "preact";
import { useEffect } from "preact/hooks";
import {
  atom,
  atomFamily,
  selector,
  SetterOrUpdater,
  useRecoilCallback,
} from "recoil";
import { makeGridDims } from "../helper-scripts/grid-helpers";
import { GridItemDef, GridPos, SelectionRect } from "../types";
import { gridTractsState } from "./layout-updating-logic";

export const itemNamesState = atom<string[]>({
  key: "itemNamesState",
  default: [],
});

type GridElBoundingBox = SelectionRect & {
  offsetLeft: number;
  offsetTop: number;
};
type GridItemBoundingBox = GridElBoundingBox & GridPos;

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

const gridCellBoundingBoxes = selector<GridItemBoundingBox[]>({
  key: "gridCellBoundingBoxes",
  get: ({ get }) => {
    const { rows, cols } = get(gridTractsState);
    return makeGridDims({ numRows: rows.length, numCols: cols.length }).map(
      ({ row, col }) => get(gridCellBoundingBoxFamily({ col, row }))
    );
  },
});

export function useGridItemBoundingBoxRecorder({
  itemRef,
  startRow,
  startCol,
  endRow,
  endCol,
  setBoundingBox,
  debugName,
}: {
  itemRef: RefObject<HTMLDivElement>;
  setBoundingBox: SetterOrUpdater<GridItemBoundingBox>;
  debugName?: string;
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
        if (debugName) {
          console.log(`Set bounding box for ${debugName}`);
        }
      }
    });
    if (itemRef.current) resizeObserver.observe(itemRef.current);

    return () => {
      if (itemRef.current) resizeObserver.unobserve(itemRef.current);
    };
  });
}

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

export const useAddNewItem = () => {
  return useRecoilCallback(({ set }) => (itemDef: GridItemDef) => {
    console.log("Adding item", itemDef);
    // Add item to both the names list and the state atom family
    set(itemNamesState, (items) => [...items, itemDef.name]);
    set(gridItemsState(itemDef.name), { ...itemDef });
  });
};

export const useDeleteItem = () => {
  return useRecoilCallback(({ set, reset }) => (name: string) => {
    console.log(`Deleting item ${name}`);
    set(itemNamesState, (items) => items.filter((item) => item !== name));
    reset(gridItemsState(name));
  });
};
