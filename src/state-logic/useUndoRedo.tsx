import { GridLayoutTemplate } from "GridTypes";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fullAppState } from "state-logic/gridLayout/atoms";
import {
  addEntry,
  getEntryFromHistory,
  hasFutureState,
  hasPreviousState,
  StateHistory,
  stateHistoryInit,
} from "../modules/StateHistory";

export function useUndoRedo() {
  const currentLayout = useRecoilValue(fullAppState);
  const setUpNewLayout = useSetRecoilState(fullAppState);

  const [canGoForward, setCanGoForward] = useState(false);
  const [canGoBackward, setCanGoBackward] = useState(false);
  const stateHistory = useRef<StateHistory>(stateHistoryInit);

  useEffect(() => {
    addEntry(currentLayout, stateHistory.current);
    setCanGoBackward(hasPreviousState(stateHistory.current));
    setCanGoForward(hasFutureState(stateHistory.current));
  }, [currentLayout]);

  const goBackward = useCallback(() => {
    setUpNewLayout(getEntryFromHistory(stateHistory.current, -1));
  }, [setUpNewLayout]);

  const goForward = useCallback(() => {
    setUpNewLayout(getEntryFromHistory(stateHistory.current, 1));
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
