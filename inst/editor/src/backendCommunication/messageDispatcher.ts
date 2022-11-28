import type { MessageFromBackendByPath } from "communication-types";

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

export const makeMessageDispatcher =
  makeMessageDispatcherGeneric<MessageFromBackendByPath>;

export type MessageDispatcher = ReturnType<typeof makeMessageDispatcher>;
