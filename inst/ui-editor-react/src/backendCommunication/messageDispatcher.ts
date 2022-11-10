import type { MessageFromBackend, MessageFromBackendUnion } from "./messages";

/**
 * A function used to subscribe to a given message path and run a callback upon
 * receiving message form backend
 */
type BackendMessageSubscriber = {
  [T in keyof MessageFromBackend]: {
    on: T;
    callback: OnBackendMsgCallback<T>;
  };
}[keyof MessageFromBackend];

export type BackendMessageReceiver = {
  subscribe: (x: BackendMessageSubscriber) => void;
};

type OnBackendMsgCallback<Path extends keyof MessageFromBackend> = (
  payload: MessageFromBackend[Path]
) => void;

type MessageSubscriptionQueue = Partial<{
  [T in keyof MessageFromBackend]: Array<
    (payload: MessageFromBackend[T]) => void
  >;
}>;

export function makeMessageDispatcher(log_msgs: boolean = false) {
  const logger = (msg: string) => (log_msgs ? null : console.log(msg));
  let subscriptions: MessageSubscriptionQueue = {};

  function subscribe(subscription: BackendMessageSubscriber) {
    const subscriberFn = subscription.callback as OnBackendMsgCallback<
      typeof subscription.on
    >;

    if (subscriptions[subscription.on] === undefined) {
      subscriptions[subscription.on] = [];
    }

    // Question mark is not really needed but typescript can't narrow here for some reason
    subscriptions[subscription.on]?.push(subscriberFn);
  }

  function dispatch({ path, payload }: MessageFromBackendUnion) {
    logger(`Message from backend: path:${path}`);
    subscriptions[path]?.forEach((callback) =>
      (callback as OnBackendMsgCallback<typeof path>)(payload)
    );
  }

  return { subscribe, dispatch };
}

export type MessageDispatcher = ReturnType<typeof makeMessageDispatcher>;
