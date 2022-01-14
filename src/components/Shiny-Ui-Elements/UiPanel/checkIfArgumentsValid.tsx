import { ShinyUiNameAndArguments } from "components/Shiny-Ui-Elements/Elements/componentTypes";

type ValidateArgsResponse =
  | {
      type: "valid";
      html: string;
    }
  | { type: "error"; error_msg: string };

export function checkIfArgumentsValid({
  state,
  onValid,
  onError,
}: {
  state: ShinyUiNameAndArguments;
  onValid: (x?: string) => void;
  onError: (x: string) => void;
}) {
  const stateBlob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });
  console.log("Sending arguments to server for validation", state);

  fetch("ValidateArgs", { method: "POST", body: stateBlob })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(function (response) {
      const r = response as ValidateArgsResponse;
      if (r.type === "valid") {
        onValid();
      }
      if (r.type === "error") {
        onError(r.error_msg);
      }
    });
}
