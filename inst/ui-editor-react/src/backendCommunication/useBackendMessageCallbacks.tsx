import React from "react";

import type { BackendMessageReceiver, BackendMessageSender } from "./messages";

export type BackendMessagePassers = {
  sendMsg: BackendMessageSender;
  backendMsgs: BackendMessageReceiver;
};

const dummyMessagePassers: BackendMessagePassers = {
  sendMsg: (x) => console.log("Sending message to backend", x),
  backendMsgs: {
    subscribe: ({ on, callback }) => {
      console.log(`Request for subscription to ${on}:`, callback);
    },
  },
};

const BackendCallbacksContext =
  React.createContext<BackendMessagePassers>(dummyMessagePassers);

export function BackendCallbacksProvider({
  children,
  sendMsg,
  backendMsgs,
}: {
  children: React.ReactNode;
} & BackendMessagePassers) {
  return (
    <BackendCallbacksContext.Provider value={{ sendMsg, backendMsgs }}>
      {children}
    </BackendCallbacksContext.Provider>
  );
}

export function useBackendCallbacks() {
  return React.useContext(BackendCallbacksContext);
}
