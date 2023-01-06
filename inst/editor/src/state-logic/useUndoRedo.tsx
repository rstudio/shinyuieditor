import React from "react";

import { useDispatch, useSelector } from "react-redux";

import StateHistory from "../modules/StateHistory";
import type { RootState } from "../state/store";
import type { MainStateOption } from "../state/uiTree";
import { SET_FULL_STATE } from "../state/uiTree";
import { useKeyboardShortcut } from "../utils/hooks/useKeyboardShortcut";
type HistoryEntry = MainStateOption;

export function useUndoRedo() {
  const state = useSelector((state: RootState) => state.uiTree);

  const dispatch = useDispatch();

  const [canGoForward, setCanGoForward] = React.useState(false);
  const [canGoBackward, setCanGoBackward] = React.useState(false);
  const stateHistory = React.useRef<StateHistory<HistoryEntry>>(
    new StateHistory({ comparisonFn: sameHistoryEntry })
  );

  React.useEffect(() => {
    // Ignore the initialization state
    if (!state || state.mode === "LOADING") return;

    const history = stateHistory.current;

    // Send latest layout to the history
    history.addEntry(state);

    // Make sure back and forward buttons are properly enabled or disabled
    setCanGoBackward(history.canGoBackwards());
    setCanGoForward(history.canGoForwards());
  }, [state]);

  const setState = React.useCallback(
    (updatedState: HistoryEntry) => {
      dispatch(SET_FULL_STATE({ state: updatedState }));
    },
    [dispatch]
  );
  const goBackward = React.useCallback(() => {
    setState(stateHistory.current.goBackwards());
  }, [setState]);

  const goForward = React.useCallback(() => {
    setState(stateHistory.current.goForwards());
  }, [setState]);

  useKeyboardShortcut({
    key: "z",
    withMeta: true,
    onPress: goBackward,
  });

  useKeyboardShortcut({
    key: "z",
    withMeta: true,
    withShift: true,
    onPress: goForward,
  });

  return {
    goBackward,
    goForward,
    canGoBackward,
    canGoForward,
  };
}

function sameHistoryEntry(newEntry: HistoryEntry, oldEntry?: HistoryEntry) {
  if (typeof oldEntry === "undefined") return false;

  if (oldEntry.mode === "LOADING" && newEntry.mode === "LOADING") {
    return true;
  }

  if (
    oldEntry.mode === "TEMPLATE_CHOOSER" &&
    newEntry.mode === "TEMPLATE_CHOOSER"
  ) {
    return (
      JSON.stringify(oldEntry.options) === JSON.stringify(newEntry.options)
    );
  }

  if (newEntry.mode === "MAIN" && oldEntry.mode === "MAIN") {
    return oldEntry.uiTree === newEntry.uiTree;
  }

  return false;
}
