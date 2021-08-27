import { RefObject } from "preact";
import { useEffect } from "preact/hooks";
import { SetterOrUpdater, useRecoilCallback } from "recoil";
import { GridItemDef, GridPos } from "../types";
import { gridItemsState, itemNamesState } from "./gridLayoutAtoms";
import {
  GridItemBoundingBox,
  gridItemBoundingBoxFamily,
} from "./dragStateAtoms";

export function useGridItemBoundingBoxRecorder({
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

export const useAddNewItem = () => {
  return useRecoilCallback(({ set }) => (itemDef: GridItemDef) => {
    // Add item to both the names list and the state atom family
    set(itemNamesState, (items) => [...items, itemDef.name]);
    set(gridItemsState(itemDef.name), { ...itemDef });
  });
};

export const useDeleteItem = () => {
  return useRecoilCallback(({ set, reset }) => (name: string) => {
    set(itemNamesState, (items) => items.filter((item) => item !== name));
    reset(gridItemsState(name));
    reset(gridItemBoundingBoxFamily(name));
  });
};
