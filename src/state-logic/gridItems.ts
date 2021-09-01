import { RefObject } from "preact";
import { useEffect } from "preact/hooks";
import { SetterOrUpdater, useRecoilTransaction_UNSTABLE } from "recoil";
import { GridItemDef, GridPos } from "../types";
import {
  GridItemBoundingBox,
  gridItemBoundingBoxFamily,
} from "./dragStateAtoms";
import { gridItemsState, itemNamesState } from "./gridLayoutAtoms";

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
  return useRecoilTransaction_UNSTABLE(
    ({ set }) =>
      (itemDef: GridItemDef | GridItemDef[]) => {
        const addAnItem = (itemDef: GridItemDef) => {
          // Add item to both the names list and the state atom family
          set(itemNamesState, (items) => [...items, itemDef.name]);
          set(gridItemsState(itemDef.name), { ...itemDef });
        };

        if (Array.isArray(itemDef)) {
          // single item
          itemDef.forEach(addAnItem);
        } else {
          addAnItem(itemDef);
        }
      },
    []
  );
};

export const useDeleteItem = () => {
  return useRecoilTransaction_UNSTABLE(
    ({ set, reset }) =>
      (name: string) => {
        set(itemNamesState, (items) => items.filter((item) => item !== name));
        reset(gridItemsState(name));
        reset(gridItemBoundingBoxFamily(name));
      },
    []
  );
};

export const useGridItemState = () => {
  const addNewItem = useAddNewItem();
  const deleteItem = useDeleteItem();

  const resetItems = useRecoilTransaction_UNSTABLE(
    ({ get }) =>
      () => {
        const allNames = get(itemNamesState);
        allNames.forEach(deleteItem);
      },
    []
  );

  return {
    add: addNewItem,
    reset: resetItems,
  };
};
