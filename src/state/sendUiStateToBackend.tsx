import type { ShinyUiNode } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";

export function sendUiStateToBackend(state: ShinyUiNode) {
  console.log("Sending state to backend", state);
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
    .then(function (response) {
      console.log("Response after sending state blob", response);
    });
}
