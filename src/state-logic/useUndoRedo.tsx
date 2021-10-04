import { GridLayoutTemplate } from "GridTypes";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fullAppState } from "state-logic/gridLayout/atoms";

export function useUndoRedo() {
  const fullLayout = useRecoilValue(fullAppState);
  const [canGoForward, setCanGoForward] = useState(false);
  const [canGoBackward, setCanGoBackward] = useState(false);

  const setUpNewLayout = useSetRecoilState(fullAppState);

  const stepsBackwards = useRef(0);
  const lastRequestedLayout = useRef<GridLayoutTemplate | null>(null);
  const inHistoryStack = useRef<boolean>(false);
  const stateHistory = useRef<GridLayoutTemplate[]>([]);

  useEffect(() => {
    const isLayoutFromHistory = sameLayout(
      fullLayout,
      lastRequestedLayout.current
    );

    // Check to make see if the undo button should be enabled
    if (isLayoutFromHistory) {
      const numStatesRemaining =
        stateHistory.current.length - stepsBackwards.current - 2;
      setCanGoBackward(numStatesRemaining > 0);
    }

    // Looking at a previous state
    if (isLayoutFromHistory && stepsBackwards.current > 0) {
      setCanGoForward(true);
      inHistoryStack.current = true;
      return;
    }

    // Forward button was pressed until being back at present
    if (isLayoutFromHistory && stepsBackwards.current === 0) {
      setCanGoForward(false);
      inHistoryStack.current = false;
      return;
    }

    // The user has modified the layout while back in history so we need to
    // erase the future history as they've started a new branch
    if (inHistoryStack.current) {
      stateHistory.current = stateHistory.current.slice(
        0,
        -stepsBackwards.current
      );
      stepsBackwards.current = 0;
      inHistoryStack.current = false;
      setCanGoForward(false);
    }

    // Add latest history to the stack.
    const noChangeInLayout = sameLayout(
      fullLayout,
      stateHistory.current[stateHistory.current.length - 1]
    );
    if (noChangeInLayout) {
      console.log(
        "Nothing has changed between steps so nothing is added to history stack"
      );
      return;
    }
    stateHistory.current = [...stateHistory.current, fullLayout];
    setCanGoBackward(true);

    // console.log({
    //   inHistoryStack: inHistoryStack.current,
    //   stepsBackwards: stepsBackwards.current,
    //   stateStackSize: stateHistory.current.length,
    //   historyStack: stateHistory.current,
    // });
  }, [fullLayout, stateHistory]);

  const goToHistoryEntry = useCallback(
    (numStepsBackwards: number) => {
      const numSnapshots = stateHistory.current.length;
      const newHistoryIndex = numSnapshots - numStepsBackwards - 1;

      lastRequestedLayout.current = stateHistory.current[newHistoryIndex];
      setUpNewLayout(lastRequestedLayout.current);
    },
    [setUpNewLayout]
  );

  const goBackward = useCallback(() => {
    stepsBackwards.current++;
    goToHistoryEntry(stepsBackwards.current);
  }, [goToHistoryEntry]);

  const goForward = useCallback(() => {
    stepsBackwards.current--;
    goToHistoryEntry(stepsBackwards.current);
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
