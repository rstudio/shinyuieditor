import { GridLayoutTemplate } from "GridTypes";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fullAppState } from "state-logic/gridLayout/atoms";

type StateHistory = {
  stack: GridLayoutTemplate[];
  stepsBack: number;
  lastRequested: GridLayoutTemplate | null;
};

const stateHistoryInit: StateHistory = {
  stack: [],
  stepsBack: 0,
  lastRequested: null,
};

export function useUndoRedo() {
  const fullLayout = useRecoilValue(fullAppState);
  const [canGoForward, setCanGoForward] = useState(false);
  const [canGoBackward, setCanGoBackward] = useState(false);

  const setUpNewLayout = useSetRecoilState(fullAppState);
  const stateHistory = useRef<StateHistory>(stateHistoryInit);

  useEffect(() => {
    const isLayoutFromHistory = sameLayout(
      fullLayout,
      stateHistory.current.lastRequested
    );

    // Check to make see if the undo button should be enabled
    if (isLayoutFromHistory) {
      const numStatesRemaining =
        stateHistory.current.stack.length - stateHistory.current.stepsBack - 2;
      setCanGoBackward(numStatesRemaining > 0);
    }

    // Looking at a previous state
    if (isLayoutFromHistory && stateHistory.current.stepsBack > 0) {
      setCanGoForward(true);
      return;
    }

    // Forward button was pressed until being back at present
    if (isLayoutFromHistory && stateHistory.current.stepsBack === 0) {
      setCanGoForward(false);
      return;
    }

    // The user has modified the layout while back in history so we need to
    // erase the future history as they've started a new branch
    if (stateHistory.current.stepsBack > 0) {
      stateHistory.current.stack = stateHistory.current.stack.slice(
        0,
        -stateHistory.current.stepsBack
      );
      stateHistory.current.stepsBack = 0;
      setCanGoForward(false);
    }

    // Add latest history to the stack.
    const noChangeInLayout = sameLayout(
      fullLayout,
      stateHistory.current.stack[stateHistory.current.stack.length - 1]
    );
    if (noChangeInLayout) {
      console.log(
        "Nothing has changed between steps so nothing is added to history stack"
      );
      return;
    }
    stateHistory.current.stack = [...stateHistory.current.stack, fullLayout];
    setCanGoBackward(true);
  }, [fullLayout]);

  const goToHistoryEntry = useCallback(
    (numStepsBackwards: number) => {
      const numSnapshots = stateHistory.current.stack.length;
      const newHistoryIndex = numSnapshots - numStepsBackwards - 1;

      stateHistory.current.lastRequested =
        stateHistory.current.stack[newHistoryIndex];
      setUpNewLayout(stateHistory.current.lastRequested);
    },
    [setUpNewLayout]
  );

  const goBackward = useCallback(() => {
    stateHistory.current.stepsBack++;
    goToHistoryEntry(stateHistory.current.stepsBack);
  }, [goToHistoryEntry]);

  const goForward = useCallback(() => {
    stateHistory.current.stepsBack--;
    goToHistoryEntry(stateHistory.current.stepsBack);
  }, [goToHistoryEntry]);

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
