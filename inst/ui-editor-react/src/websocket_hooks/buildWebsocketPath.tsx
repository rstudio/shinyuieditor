import { DEV_MODE } from "env_variables";

export function buildWebsocketPath() {
  // If we're using the dev proxy we should just go straight to websocket.
  // Otherwise use the same location as the main app
  if (DEV_MODE) return "localhost:8888";

  const loc = window.location;

  // The type of the websocket protocol will change depending on if we're on a
  // http (typically localhost) or https (something like workbench)
  const protocol = loc.protocol === "https:" ? "wss:" : "ws:";

  return protocol + "//" + loc.host + loc.pathname;
}
