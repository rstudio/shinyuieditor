import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";

export function sendUiStateToBackend(state: ShinyUiNode) {
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
      console.error("Error with sending state to backend", e);
    });
}
