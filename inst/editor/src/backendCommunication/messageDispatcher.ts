import type {
  MessageFromBackendByPath,
  MessageFromBackend,
} from "communication-types";

type BackendMsgPath = keyof MessageFromBackendByPath;

/**
 * A function used to subscribe to a given message path and run a callback upon
 * receiving message form backend
 */
type OnBackendMsgCallback<Path extends BackendMsgPath> = (
  payload: MessageFromBackendByPath[Path]
) => void;

export function makeMessageDispatcher() {
  const subscriptions: {
    [T in BackendMsgPath]?: Array<OnBackendMsgCallback<T>>;
  } = {};

  return {
    subscribe: <Path extends BackendMsgPath>(
      on: Path,
      subscriberFn: OnBackendMsgCallback<Path>
    ) => {
      const subscriptionsForPath = subscriptions[on];

      subscriptions[on] = [
        ...(subscriptionsForPath ?? []),
        subscriberFn,
      ] as typeof subscriptionsForPath;

      return {
        unsubscribe: () => {
          const subscriptionsForPath = subscriptions[on];

          subscriptions[on] = (subscriptionsForPath ?? []).filter(
            (fn) => fn !== subscriberFn
          ) as typeof subscriptionsForPath;
        },
      };
    },
    dispatch: ({ path, payload }: MessageFromBackend) => {
      subscriptions[path]?.forEach((callback) =>
        (callback as OnBackendMsgCallback<typeof path>)(payload)
      );
    },
  };
}

export type MessageDispatcher = ReturnType<typeof makeMessageDispatcher>;
