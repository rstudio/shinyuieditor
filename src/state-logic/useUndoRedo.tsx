import { GridLayoutTemplate } from "GridTypes";
import StateHistory from "modules/StateHistory";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { fullAppState } from "state-logic/gridLayout/atoms";
import { sameLayoutTemplate } from "utils/sameLayoutTemplate";
import { selectedItemNameState } from "./gridItems";

type HistoryEntry = {
  layout: GridLayoutTemplate;
  selectedItemName: string | null;
};

export function useUndoRedo() {
  const currentLayout = useRecoilValue(fullAppState);
  const [currentSelectedName, setSelectedName] = useRecoilState(
    selectedItemNameState
  );
  const setUpNewLayout = useSetRecoilState(fullAppState);

  const [canGoForward, setCanGoForward] = useState(false);
  const [canGoBackward, setCanGoBackward] = useState(false);
  const stateHistory = useRef<StateHistory<HistoryEntry>>(
    new StateHistory({ comparisonFn: sameHistoryEntry })
  );

  useEffect(() => {
    // Ignore the initialization state
    if (isEmptyTemplate(currentLayout)) return;

    const history = stateHistory.current;

    // Send latest layout to the history
    history.addEntry({
      layout: currentLayout,
      selectedItemName: currentSelectedName,
    });

    // Make sure back and forward buttons are properly enabled or disabled
    setCanGoBackward(history.canGoBackwards());
    setCanGoForward(history.canGoForwards());
  }, [currentLayout, currentSelectedName]);

  const setState = useCallback(
    ({ layout, selectedItemName }: HistoryEntry) => {
      setUpNewLayout(layout);
      setSelectedName(selectedItemName);
    },
    [setSelectedName, setUpNewLayout]
  );
  const goBackward = useCallback(() => {
    setState(stateHistory.current.goBackwards());
  }, [setState]);

  const goForward = useCallback(() => {
    setState(stateHistory.current.goForwards());
  }, [setState]);

  return {
    goBackward,
    goForward,
    canGoBackward,
    canGoForward,
  };
}

function sameHistoryEntry(newEntry: HistoryEntry, oldEntry?: HistoryEntry) {
  if (typeof oldEntry === "undefined") return false;
  if (newEntry.selectedItemName !== oldEntry.selectedItemName) return false;

  return sameLayoutTemplate(newEntry.layout, oldEntry.layout);
}
function isEmptyTemplate(template?: GridLayoutTemplate) {
  if (typeof template === "undefined") return true;
  const { rows, cols, items } = template;
  return rows.length === 0 && cols.length === 0 && items.length === 0;
}
