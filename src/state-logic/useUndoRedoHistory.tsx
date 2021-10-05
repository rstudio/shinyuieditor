import { GridLayoutTemplate } from "GridTypes";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fullAppState } from "state-logic/gridLayout/atoms";

export function useUndoRedo() {
  const fullLayout = useRecoilValue(fullAppState);
  const [canGoForward, setCanGoForward] = useState(false);
  const setUpNewLayout = useSetRecoilState(fullAppState);
  const lastRequestedLayout = useRef<GridLayoutTemplate | null>(null);
  const stateHistory = useRef<GridLayoutTemplate[]>([]);

  useEffect(() => {
    if (!sameLayout(fullLayout, lastRequestedLayout.current)) {
      window.history.pushState(fullLayout, "test");
      setCanGoForward(true);
    }
  }, [fullLayout, stateHistory]);

  const goBackward = useCallback(() => {
    console.log("Back please!");
    window.history.back();
  }, []);

  const goForward = useCallback(() => {
    console.log("Forward please!");
    window.history.forward();
  }, []);

  const updateFromHistory = useCallback(
    (e: PopStateEvent) => {
      console.log("History pop", e);
      const requestedState = e.state as GridLayoutTemplate;
      lastRequestedLayout.current = requestedState;
      setUpNewLayout(requestedState);
    },
    [setUpNewLayout]
  );

  useEffect(() => {
    window.addEventListener("popstate", updateFromHistory);
    return () => window.removeEventListener("popstate", updateFromHistory);
  }, [updateFromHistory]);

  return {
    goBackward,
    goForward,
    canGoBackward: true,
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
