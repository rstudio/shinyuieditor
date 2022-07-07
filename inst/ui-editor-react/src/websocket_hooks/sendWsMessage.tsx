import type { OutgoingPreviewAppMsg } from "components/AppPreview/useCommunicateWithWebsocket";

import type { OutgoingStateMsg } from "./useSyncUiWithBackend";

export function sendWsMessage(
  ws: WebSocket,
  msg: OutgoingStateMsg | OutgoingPreviewAppMsg
) {
  const msg_blob = new Blob([JSON.stringify(msg)], {
    type: "application/json",
  });
  ws.send(msg_blob);
}
