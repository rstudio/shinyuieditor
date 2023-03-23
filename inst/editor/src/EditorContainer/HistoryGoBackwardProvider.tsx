import React from "react";

import type { HistoryInfo } from "../state-logic/useUndoRedo";

type HistoryBackwardsValues = Pick<HistoryInfo, "canGoBackward" | "goBackward">;

// Create react context for a function to go backwards in history
const HistoryGoBackwardContext = React.createContext<HistoryBackwardsValues>({
  canGoBackward: false,
  goBackward: () => {
    throw new Error("No history go backward function provided");
  },
});

export function HistoryGoBackwardProvider({
  children,
  goBackward,
  canGoBackward,
}: {
  children: React.ReactNode;
} & HistoryBackwardsValues) {
  return (
    <HistoryGoBackwardContext.Provider value={{ goBackward, canGoBackward }}>
      {children}
    </HistoryGoBackwardContext.Provider>
  );
}

export function useHistoryGoBackward() {
  return React.useContext(HistoryGoBackwardContext);
}
