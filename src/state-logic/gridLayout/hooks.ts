import { useRecoilTransaction_UNSTABLE } from "recoil";
import { CSSMeasure, GridItemDef } from "../../GridTypes";
import { gridItemAtoms, gridItemNames } from "../gridItems";
import { RecoilGetter, RecoilSetter } from "../RecoilHelperClasses";
import { colsState, rowsState, TractDirection, TractPosition } from "./atoms";

export function useAddTract(dir: TractDirection) {
  return useRecoilTransaction_UNSTABLE(
    ({ set, get }) =>
      (tractSize: CSSMeasure, indexToInsertAt: number) => {
        const tractAtom = dir === "rows" ? rowsState : colsState;
        const existingTracts = get(tractAtom);

        set(tractAtom, [
          ...existingTracts.slice(0, indexToInsertAt),
          tractSize,
          ...existingTracts.slice(indexToInsertAt),
        ]);

        const itemNames = get(gridItemNames);
        itemNames.forEach((name) => {
          updateItemBoundsForNewTract(name, get, set, {
            index: indexToInsertAt,
            dir,
          });
        });
      }
  );
}

export function updateItemBoundsForNewTract(
  itemName: string,
  get: RecoilGetter<GridItemDef>,
  set: RecoilSetter<GridItemDef>,
  { index, dir }: TractPosition
) {
  const itemState = gridItemAtoms(itemName);
  const item = get(itemState);
  const startPos = dir === "rows" ? "startRow" : "startCol";
  const endPos = dir === "rows" ? "endRow" : "endCol";
  const currentStart = item[startPos];
  const currentEnd = item[endPos] ?? currentStart;

  // There are three options for positioning.
  // First: the new tract is beyond the end of the item
  //   and then nothing needs to happen
  // Second: The new tract is before the item entirely, then both the
  //   start and the end need to be shifted up
  // Third: The new tract is _within_ the boundaries of the item
  //   in this case the item needs to just have its end pos adjusted up

  if (index >= currentEnd) {
    // Beyond end of item and we dont need to do anything
    // If item didnt move then the updater function returns null and we
    // can skip the update
    return;
  }

  // Make copy to avoid mutation problems
  const updatedDef = { ...item };
  if (index < currentStart) {
    // Before item
    updatedDef[startPos] = currentStart + 1;
    updatedDef[endPos] = currentEnd + 1;
  } else {
    // Within item bounds
    updatedDef[endPos] = currentEnd + 1;
  }
  set(itemState, updatedDef);
}
