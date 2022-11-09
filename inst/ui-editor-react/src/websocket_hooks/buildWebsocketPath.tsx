import { DEV_MODE } from "env_variables";

export function buildWebsocketPath() {
  // If we're in dev mode the app itself will be hosted on the dev server which
  // is not where the websocket communication happens. In this situation we rely
  // on the backend of the ui editor to be running on port `8888` of localhost.

  return buildWebsocketPathFromDomain(
    DEV_MODE
      ? "localhost:8888"
      : window.location.host + window.location.pathname
  );
}

export function buildWebsocketPathFromDomain(domain: string) {
  // If we're in dev mode the app itself will be hosted on the dev server which
  // is not where the websocket communication happens. In this situation we rely
  // on the backend of the ui editor to be running on port `8888` of localhost.

  // The type of the websocket protocol will change depending on if we're on a
  // http (typically localhost) or https (something like workbench)
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

  return protocol + "//" + domain;
}
