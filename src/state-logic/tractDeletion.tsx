import { GridItemDef, GridPos } from "GridTypes";
import { selector, useRecoilTransaction_UNSTABLE } from "recoil";
import { removeAtIndex } from "utils/array-helpers";
import { deleteAnItem, gridItemAtoms, gridItemNames } from "./gridItems";
import { colsState, rowsState, TractDirection } from "./gridLayout/atoms";

type TractsToConflictsMap = {
  rows: Map<number, string[]>;
  cols: Map<number, string[]>;
};

function updateConflicts(
  el: GridItemDef,
  dir: TractDirection,
  tractsWithIssues: TractsToConflictsMap
) {
  const isConflicting =
    dir === "rows" ? el.startRow === el.endRow : el.startCol === el.endCol;
  if (isConflicting) {
    const zeroBasedIndex = (dir === "rows" ? el.startRow : el.startCol) - 1;
    const existing = tractsWithIssues[dir].get(zeroBasedIndex);
    tractsWithIssues[dir].set(zeroBasedIndex, [...(existing ?? []), el.name]);
  }
}

export const currentTractDeletionConflicts = selector<TractsToConflictsMap>({
  key: "currentTractDeletionConflicts",
  get: ({ get }) => {
    const itemNames = get(gridItemNames);

    const tractsWithIssues: TractsToConflictsMap = {
      rows: new Map(),
      cols: new Map(),
    };

    itemNames.forEach((name) => {
      const el = get(gridItemAtoms(name));

      updateConflicts(el, "rows", tractsWithIssues);
      updateConflicts(el, "cols", tractsWithIssues);
    });

    return tractsWithIssues;
  },
});

export default function useRemoveTract() {
  const removeTract = useRecoilTransaction_UNSTABLE(
    ({ get, set, reset }) => (dir: TractDirection, index: number) => {
      // First check for trouble elements before proceeding so we can error out
      // and tell the user why

      // The grid positions are indexed by 1 instead of 0 so we need to add
      // one to compare with the grid position
      const oneBasedIndex = index + 1;
      const startPos: keyof GridPos = dir === "rows" ? "startRow" : "startCol";
      const endPos: keyof GridPos = dir === "rows" ? "endRow" : "endCol";
      const itemNames = get(gridItemNames);

      let itemsStartingAfterTract: string[] = [];
      let itemsEndingAfterTract: string[] = [];
      itemNames.forEach((name) => {
        const el = get(gridItemAtoms(name));
        const elStart = el[startPos];
        // Since GridPos allows the end position to be left blank we need to
        // guarentee it exists
        const elEnd = el[endPos] ?? elStart;

        if (elStart === elEnd && elStart === oneBasedIndex) {
          deleteAnItem(name, get, set, reset);
        }

        if (elStart > oneBasedIndex) itemsStartingAfterTract.push(name);
        if (elEnd >= oneBasedIndex) itemsEndingAfterTract.push(name);
      });

      // Go through and update items that have the removed tract in their span
      itemsStartingAfterTract.forEach((name) => {
        set(gridItemAtoms(name), (el) => {
          const newEl = { ...el };
          newEl[startPos]--;
          return newEl;
        });
      });

      itemsEndingAfterTract.forEach((name) => {
        set(gridItemAtoms(name), (el) => {
          const newEl = { ...el };
          newEl[endPos] = (newEl[endPos] ?? newEl[startPos]) - 1;
          return newEl;
        });
      });

      set(dir === "rows" ? rowsState : colsState, (existingTracts) => {
        return removeAtIndex(existingTracts, index);
      });
    }
  );
  return removeTract;
}
