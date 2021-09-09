import { RefObject } from "preact";
import { useEffect } from "preact/hooks";
import {
  SetterOrUpdater,
  useRecoilTransaction_UNSTABLE,
  useSetRecoilState,
} from "recoil";
import { GridItemDef, GridPos } from "../../types";
import {
  gridCellBoundingBoxFamily,
  GridItemBoundingBox,
  gridItemBoundingBoxFamily,
} from "../dragging/atoms";
import { gridItemAtoms, gridItemNames } from "./atoms";

export function useGridCellBoundingBoxRecorder({
  row,
  col,
  cellRef,
}: {
  row: number;
  col: number;
  cellRef: RefObject<HTMLDivElement>;
}) {
  const setBoundingBox = useSetRecoilState(
    gridCellBoundingBoxFamily({ row, col })
  );

  useGridBoundingBoxRecorder({
    itemRef: cellRef,
    startRow: row,
    startCol: col,
    setBoundingBox,
  });
}
export function useGridItemBoundingBoxRecorder({
  itemRef,
  name,
  startRow,
  startCol,
  endRow,
  endCol,
}: {
  itemRef: RefObject<HTMLDivElement>;
} & GridItemDef) {
  const setBoundingBox = useSetRecoilState(gridItemBoundingBoxFamily(name));

  useGridBoundingBoxRecorder({
    itemRef,
    startRow,
    startCol,
    endRow,
    endCol,
    setBoundingBox,
  });

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

function useGridBoundingBoxRecorder({
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

// Adds a new item to both the name list and creates its new state atom
export const useAddNewItem = () => {
  return useRecoilTransaction_UNSTABLE(
    ({ set }) =>
      (itemDef: GridItemDef | GridItemDef[]) => {
        if (!Array.isArray(itemDef)) itemDef = [itemDef];

        itemDef.forEach((def) => {
          set(gridItemNames, (names) => [...names, def.name]);
          set(gridItemAtoms(def.name), def);
        });
      },
    []
  );
};
export const useDeleteItem = () => {
  return useRecoilTransaction_UNSTABLE(
    ({ set, reset }) =>
      (name: string) => {
        set(gridItemNames, (items) => items.filter((item) => item !== name));
        reset(gridItemAtoms(name));
        reset(gridItemBoundingBoxFamily(name));
      },
    []
  );
};
