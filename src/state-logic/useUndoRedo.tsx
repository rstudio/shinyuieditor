import { GridLayoutTemplate } from "GridTypes";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fullAppState } from "state-logic/gridLayout/atoms";
import StateHistory from "modules/StateHistory";

export function useUndoRedo() {
  const currentLayout = useRecoilValue(fullAppState);
  const setUpNewLayout = useSetRecoilState(fullAppState);

  const [canGoForward, setCanGoForward] = useState(false);
  const [canGoBackward, setCanGoBackward] = useState(false);
  const stateHistory = useRef<StateHistory<GridLayoutTemplate>>(
    new StateHistory({ comparisonFn: sameLayout })
  );

  useEffect(() => {
    // Ignore the initialization state
    if (isEmptyTemplate(currentLayout)) return;

    const history = stateHistory.current;

    // Send latest layout to the history
    history.addEntry(currentLayout);

    // Make sure back and forward buttons are properly enabled or disabled
    setCanGoBackward(history.canGoBackwards());
    setCanGoForward(history.canGoForwards());
  }, [currentLayout]);

  const goBackward = useCallback(() => {
    setUpNewLayout(stateHistory.current.goBackwards());
  }, [setUpNewLayout]);

  const goForward = useCallback(() => {
    setUpNewLayout(stateHistory.current.goForwards());
  }, [setUpNewLayout]);

  return {
    goBackward,
    goForward,
    canGoBackward,
    canGoForward,
  };
}

function sameLayout(
  a: GridLayoutTemplate,
  b: GridLayoutTemplate | null
): boolean {
  if (b === null) return false;

  return JSON.stringify(a) === JSON.stringify(b);
}

function isEmptyTemplate(template?: GridLayoutTemplate) {
  if (typeof template === "undefined") return true;
  const { rows, cols, items } = template;
  return rows.length === 0 && cols.length === 0 && items.length === 0;
}
