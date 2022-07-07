import type { PREVIEW_APP_TYPES } from "components/AppPreview/useCommunicateWithWebsocket";

import type { STATE_UPDATE_TYPES } from "./useSyncUiWithBackend";

export function sendWsMessage(
  ws: WebSocket,
  msg: STATE_UPDATE_TYPES | PREVIEW_APP_TYPES
) {
  const msg_blob = new Blob([JSON.stringify(msg)], {
    type: "application/json",
  });
  ws.send(msg_blob);
}
