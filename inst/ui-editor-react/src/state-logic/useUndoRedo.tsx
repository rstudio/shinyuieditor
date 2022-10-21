import React from "react";

import StateHistory from "modules/StateHistory";
import { useDispatch, useSelector } from "react-redux";
import type { ShinyUiRootNode } from "Shiny-Ui-Elements/uiNodeTypes";
import type { RootState } from "state/store";
import { initialUiTree, SET_FULL_STATE } from "state/uiTree";

type HistoryEntry = ShinyUiRootNode;

export function useUndoRedo() {
  const tree = useSelector((state: RootState) => state.uiTree);
  const dispatch = useDispatch();

  const [canGoForward, setCanGoForward] = React.useState(false);
  const [canGoBackward, setCanGoBackward] = React.useState(false);
  const stateHistory = React.useRef<StateHistory<HistoryEntry>>(
    new StateHistory({ comparisonFn: sameHistoryEntry })
  );

  React.useEffect(() => {
    // Ignore the initialization state
    if (!tree || tree === initialUiTree) return;

    const history = stateHistory.current;

    // Send latest layout to the history
    history.addEntry(tree);

    // Make sure back and forward buttons are properly enabled or disabled
    setCanGoBackward(history.canGoBackwards());
    setCanGoForward(history.canGoForwards());
  }, [tree]);

  const setState = React.useCallback(
    (updatedTree: HistoryEntry) => {
      dispatch(SET_FULL_STATE({ state: updatedTree }));
    },
    [dispatch]
  );
  const goBackward = React.useCallback(() => {
    setState(stateHistory.current.goBackwards());
  }, [setState]);

  const goForward = React.useCallback(() => {
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
  return newEntry === oldEntry;
}
