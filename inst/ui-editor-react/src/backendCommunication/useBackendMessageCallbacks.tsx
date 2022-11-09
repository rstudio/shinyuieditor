import React from "react";

import type { BackendMessageReceiver, BackendMessageSender } from "./messages";

type BackendMessagePassers = {
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
}: {
  children: React.ReactNode;
}) {
  return (
    <BackendCallbacksContext.Provider value={dummyMessagePassers}>
      {children}
    </BackendCallbacksContext.Provider>
  );
}
export function useBackendCallbacks() {
  return React.useContext(BackendCallbacksContext);
}
