import type { MessageFromBackend, MessageFromBackendUnion } from "./messages";

type BackendMsgPath = keyof MessageFromBackend;

/**
 * A function used to subscribe to a given message path and run a callback upon
 * receiving message form backend
 */
type OnBackendMsgCallback<Path extends BackendMsgPath> = (
  payload: MessageFromBackend[Path]
) => void;

export function makeMessageDispatcher(log_msgs: boolean = false) {
  // eslint-disable-next-line no-console
  const logger = (msg: string) => (log_msgs ? null : console.log(msg));
  let subscriptions: {
    [T in BackendMsgPath]?: Array<OnBackendMsgCallback<T>>;
  } = {};

  const subscribe = <Path extends BackendMsgPath>(
    on: Path,
    subscriberFn: OnBackendMsgCallback<Path>
  ) => {
    if (subscriptions[on] === undefined) {
      subscriptions[on] = [];
    }

    // Question mark is not really needed but typescript can't narrow here for some reason
    subscriptions[on]?.push(subscriberFn);
  };

  function dispatch({ path, payload }: MessageFromBackendUnion) {
    logger(`Message from backend: path:${path}`);
    subscriptions[path]?.forEach((callback) =>
      (callback as OnBackendMsgCallback<typeof path>)(payload)
    );
  }

  return { subscribe, dispatch };
}

export type MessageDispatcher = ReturnType<typeof makeMessageDispatcher>;
