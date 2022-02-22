import { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";

type ValidateArgsResponse =
  | {
      type: "valid";
      uiHTML: string;
    }
  | { type: "error"; error_msg: string };

async function getUiNodeValidation({
  node,
}: {
  node: ShinyUiNode;
}): Promise<ValidateArgsResponse | { type: "server-error"; status: string }> {
  const stateBlob = new Blob([JSON.stringify(node, null, 2)], {
    type: "application/json",
  });
  console.log("Sending arguments to server for validation", node);

  const validateResponse = await fetch("ValidateArgs", {
    method: "POST",
    body: stateBlob,
  });

  if (!validateResponse.ok) {
    return { type: "server-error", status: validateResponse.statusText };
  }

  const responseBody = (await validateResponse.json()) as ValidateArgsResponse;

  return responseBody;
}

export async function checkIfArgumentsValid({
  state,
  onValid,
  onError,
}: {
  state: ShinyUiNode;
  onValid: (x?: string) => void;
  onError: (x: string) => void;
}) {
  const result = await getUiNodeValidation({
    node: state,
  });

  if (result.type === "valid") {
    onValid();
    return;
  }

  if (result.type === "error") {
    onError(result.error_msg);
    return;
  }

  // Otherwise we have a server error and need to make sure the user knows this
  // before continuing
  console.error(`HTTP error! status: ${result.status}`);
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
}
