import React from "react";

import type { MessageDispatcher } from "./messageDispatcher";
import type { MessageToBackendUnion } from "./messages";

/**
 * Communication layer for client and backend
 */
export type BackendMessagePassers = {
  /**
   * Function to pass a message to the backend
   */
  sendMsg: (msg: MessageToBackendUnion) => void;
  /**
   * Object to subscribe to incoming messages from backend
   */
  incomingMsgs: Pick<MessageDispatcher, "subscribe">;
};

const dummyMessagePassers: BackendMessagePassers = {
  sendMsg: (x) => console.log("Sending message to backend", x),
  incomingMsgs: {
    subscribe: (on, callback) => {
      console.log(`Request for subscription to ${on}:`, callback);
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
