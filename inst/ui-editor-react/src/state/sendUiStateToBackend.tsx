import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import debounce from "just-debounce-it";

function sendToBackend(state: ShinyUiNode) {
  const stateBlob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });

  fetch("UiDump", { method: "POST", body: stateBlob })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .catch((e) => {
      // console.warn("Failed to send error to backend", e);
    });
}

export const sendUiStateToBackend = debounce(sendToBackend, 500);
