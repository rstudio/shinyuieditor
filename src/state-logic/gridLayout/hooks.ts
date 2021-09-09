import { useRecoilTransaction_UNSTABLE } from "recoil";
import { CSSMeasure } from "../../types";
import { gridItemAtoms, gridItemNames } from "../gridItems/atoms";
import {
  gridColsAtomFamily,
  gridRowsAtomFamily,
  numTractsState,
  TractDirection,
} from "./atoms";

export function useAddTract(dir: TractDirection) {
  return useRecoilTransaction_UNSTABLE(
    ({ set, get }) =>
      (tractSize: CSSMeasure, index: number) => {
        const tractsAtomFamily =
          dir === "cols" ? gridRowsAtomFamily : gridColsAtomFamily;
        const currNumTracts = get(numTractsState(dir));
        const newNumTracts = currNumTracts + 1;

        // Get the tracts that exist _after_ this current one as they will
        // have their indices shifted up one
        const numTractsShifted = currNumTracts - index;
        const laterTracts = Array.from({ length: numTractsShifted }, (_, i) => {
          const currentIndex = index + i;
          return {
            index: currentIndex + 1,
            value: get(tractsAtomFamily(currentIndex)),
          };
        });

        // Set the new tract
        set(tractsAtomFamily(index), tractSize);

        // Now update the ones above it
        laterTracts.forEach(({ index, value }) => {
          set(tractsAtomFamily(index), value);
        });

        const itemNames = get(gridItemNames);
        itemNames.forEach((name) => {
          const itemState = gridItemAtoms(name);

          const itemDef = get(itemState);

          const startPos = dir === "rows" ? "startRow" : "startCol";
          const endPos = dir === "rows" ? "endRow" : "endCol";
          const currentStart = itemDef[startPos];
          const currentEnd = itemDef[endPos] ?? currentStart;

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
            return null;
          }

          // Make copy to avoid mutation problems
          const updatedDef = { ...itemDef };
          if (index < currentStart) {
            // Before item
            updatedDef[startPos] = currentStart + 1;
            updatedDef[endPos] = currentEnd + 1;
          } else {
            // Within item bounds
            updatedDef[endPos] = currentEnd + 1;
          }

          set(itemState, updatedDef);
        });

        // Add item to both the names list and the state atom family
        set(numTractsState(dir), newNumTracts);
      }
  );
}
