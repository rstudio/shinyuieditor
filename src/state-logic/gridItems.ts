import { RefObject } from "preact";
import { useEffect } from "preact/hooks";
import { atom, atomFamily, SetterOrUpdater, useRecoilCallback } from "recoil";
import { GridItemDef, GridPos, SelectionRect } from "../types";

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
export const itemBoundingBoxState = atomFamily<GridItemBoundingBox, string>({
  key: "itemBoundingBoxState",
  default: {
    top: -1,
    bottom: -1,
    left: -1,
    right: -1,
    startRow: 0,
    startCol: 0,
    offsetLeft: 0,
    offsetTop: 0,
  },
});

export const gridCellBoundingBoxState = atomFamily<
  GridItemBoundingBox,
  { row: number; col: number }
>({
  key: "itemBoundingBoxState",
  default: {
    top: -1,
    bottom: -1,
    left: -1,
    right: -1,
    startRow: 0,
    startCol: 0,
    offsetLeft: 0,
    offsetTop: 0,
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
