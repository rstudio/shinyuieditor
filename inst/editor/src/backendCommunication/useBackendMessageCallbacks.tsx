import React from "react";

import type { MessageToBackend } from "communication-types";

import type { MessageDispatcher } from "./messageDispatcher";
/**
 * Communication layer for client and backend
 */
export type BackendMessagePassers = {
  /**
   * Function to pass a message to the backend
   */
  sendMsg: (msg: MessageToBackend) => void;
  /**
   * Object to subscribe to incoming messages from backend
   */
  incomingMsgs: Omit<MessageDispatcher, "dispatch">;
};

const dummyMessagePassers: BackendMessagePassers = {
  sendMsg: (x) => console.log("Sending message to backend", x),
  incomingMsgs: {
    subscribe: (on, callback) => {
      console.log(`Request for subscription to ${on}:`, callback);
      return {
        unsubscribe: () =>
          console.log(`Request for removing subscription to ${on}:`, callback),
      };
    },
  },
};

const BackendCallbacksContext =
  React.createContext<BackendMessagePassers>(dummyMessagePassers);

export function BackendCallbacksProvider({
  children,
  sendMsg,
  incomingMsgs,
}: {
  children: React.ReactNode;
} & BackendMessagePassers) {
  return (
    <BackendCallbacksContext.Provider value={{ sendMsg, incomingMsgs }}>
      {children}
    </BackendCallbacksContext.Provider>
  );
}

export function useBackendCallbacks() {
  return React.useContext(BackendCallbacksContext);
}
