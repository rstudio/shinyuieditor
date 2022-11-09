import type { OutgoingPreviewAppMsg } from "components/AppPreview/useCommunicateWithBackend";
import debounce from "just-debounce-it";

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

export const sendWsMessageDebounced = debounce(sendWsMessage, 500, true);
