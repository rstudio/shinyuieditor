import type {
  BackendMessageSubscriber,
  MessageFromBackend,
  MessageFromBackendUnion,
  OnBackendMsgCallback,
} from "./messages";

type MessageSubscriptionQueue = Partial<{
  [T in keyof MessageFromBackend]: Array<
    (payload: MessageFromBackend[T]) => void
  >;
}>;

export function makeMessageDispatcher() {
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

    console.log(
      `Received subscription request, current subscriptions`,
      subscriptions
    );
  }

  function dispatch({ path, payload }: MessageFromBackendUnion) {
    subscriptions[path]?.forEach((callback) =>
      (callback as OnBackendMsgCallback<typeof path>)(payload)
    );
  }

  return { subscribe, dispatch };
}
