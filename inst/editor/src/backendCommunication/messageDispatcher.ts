import type { MessageFromBackendByPath } from "communication-types";

export function makeMessageDispatcherGeneric<
  Payload extends Record<string, unknown>
>() {
  const subscriptions: {
    [Path in keyof Payload]?: Array<(x: Payload[Path]) => void>;
  } = {};

  return {
    subscribe: <Path extends keyof Payload>(
      on: Path,
      subscriberFn: (x: Payload[Path]) => void
    ) => {
      subscriptions[on] = [...(subscriptions[on] ?? []), subscriberFn];

      return {
        unsubscribe: () => {
          subscriptions[on] = (subscriptions[on] ?? []).filter(
            (fn) => fn !== subscriberFn
          );
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
