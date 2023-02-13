import type { MessageToBackend } from "./MessageToBackend";
import type { MessageToClientByPath } from "./MessageToClient";

/**
 * Communication layer for client and backend
 */

export type BackendConnection = {
  /**
   * Function to pass a message to the backend
   */
  sendMsg: (msg: MessageToBackend) => void;
  /**
   * Object to subscribe to incoming messages from backend
   */
  incomingMsgs: Omit<MessageDispatcher, "dispatch">;
  /**
   * The different backend runtimes that can be supporting the ui editor client
   */
  mode: "VSCODE" | "HTTPUV" | "STATIC";
};


export const makeMessageDispatcher = makeMessageDispatcherGeneric<MessageToClientByPath>;

export type MessageDispatcher = ReturnType<typeof makeMessageDispatcher>;

export function makeMessageDispatcherGeneric<
  Payload extends Record<string, unknown>
>() {
  const subscriptions: {
    [Path in keyof Payload]?: Set<(payload: Payload[Path]) => void>;
  } = {};

  return {
    subscribe: <Path extends keyof Payload>(
      on: Path,
      subscriberFn: (payload: Payload[Path]) => void
    ) => {
      if (subscriptions[on] === undefined) {
        subscriptions[on] = new Set();
      }

      subscriptions[on]!.add(subscriberFn);

      return {
        unsubscribe: () => {
          subscriptions[on]!.delete(subscriberFn);
        },
      };
    },
    dispatch: <Path extends keyof Payload>(
      path: Path,
      payload: Payload[Path]
    ) => {
      subscriptions[path]?.forEach((callback) => callback(payload));
    },
  };
}

