import React from "react";

import type { BackendConnection } from "communication-types";

// eslint-disable-next-line no-console
const logger = console.log;
const dummyMessagePassers: BackendConnection = {
  sendMsg: (x) => logger("Sending message to backend", x),
  incomingMsgs: {
    subscribe: (on, callback) => {
      logger(`Request for subscription to ${on}:`, callback);
      return {
        unsubscribe: () =>
          logger(`Request for removing subscription to ${on}:`, callback),
      };
    },
  },
  mode: "HTTPUV",
};

const BackendConnectionContext =
  React.createContext<BackendConnection>(dummyMessagePassers);

export function BackendConnectionProvider({
  children,
  sendMsg,
  incomingMsgs,
  mode,
}: {
  children: React.ReactNode;
} & BackendConnection) {
  return (
    <BackendConnectionContext.Provider value={{ sendMsg, incomingMsgs, mode }}>
      {children}
    </BackendConnectionContext.Provider>
  );
}

export function useBackendConnection() {
  return React.useContext(BackendConnectionContext);
}
