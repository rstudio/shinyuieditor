import { ShinyUiNameAndArguments } from "components/Shiny-Ui-Elements/uiNodeTypes";

type ValidateArgsResponse =
  | {
      type: "valid";
      html: string;
    }
  | { type: "error"; error_msg: string };

export async function checkIfArgumentsValid({
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

  const validateResponse = await fetch("ValidateArgs", {
    method: "POST",
    body: stateBlob,
  });

  if (!validateResponse.ok) {
    console.error(`HTTP error! status: ${validateResponse.status}`);
    if (
      window.confirm(
        "Could not check with backend for settings validation. You're on your own."
      ) === true
    ) {
      onValid();
      return;
    }
    onError(
      "Failed to validate settings for component. Try again or check to make sure your R session didn't crash."
    );
    return;
  }

  const responseBody = (await validateResponse.json()) as ValidateArgsResponse;

  if (responseBody.type === "valid") {
    onValid();
  }
  if (responseBody.type === "error") {
    onError(responseBody.error_msg);
  }
}
