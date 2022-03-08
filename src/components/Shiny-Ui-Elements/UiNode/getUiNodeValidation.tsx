import type { ShinyUiNode } from "../Elements/uiNodeTypes";

type ValidateArgsResponse =
  | {
      type: "valid";
      uiHTML: string;
    }
  | { type: "error"; error_msg: string };

export async function getUiNodeValidation({
  node,
}: {
  node: ShinyUiNode;
}): Promise<ValidateArgsResponse | { type: "server-error"; status: string }> {
  try {
    const stateBlob = new Blob([JSON.stringify(node, null, 2)], {
      type: "application/json",
    });

    const validateResponse = await fetch("ValidateArgs", {
      method: "POST",
      body: stateBlob,
    });

    if (!validateResponse.ok) {
      return { type: "server-error", status: validateResponse.statusText };
    }

    const responseBody =
      (await validateResponse.json()) as ValidateArgsResponse;

    return responseBody;
  } catch (err) {
    return { type: "server-error", status: "Uncaught error" };
  }
}
