import type { MessageToBackend } from "communication-types/src/MessageToBackend";
import type { PickKeyFn } from "util-functions/src/TypescriptUtils";

import { useBackendConnection } from "../backendCommunication/useBackendMessageCallbacks";
import { TooltipButton } from "../components/PopoverEl/Tooltip";
import type { ShinyUiNode } from "../main";
import type { ServerBindings } from "../Shiny-Ui-Elements/uiNodeTypes";
import { getUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";
import { useCurrentAppInfo } from "../state/app_info";

export function GoToSourceBtns({ node }: { node: ShinyUiNode | null }) {
  const { sendMsg, mode } = useBackendConnection();

  if (mode !== "VSCODE" || !node) return null;

  const serverBindings = (getUiNodeInfo(node.id).serverBindings ??
    {}) as Partial<ServerBindings>;

  return (
    <div>
      <GoToOutputsBtn
        serverOutputInfo={serverBindings?.outputs}
        node={node}
        sendMsg={sendMsg}
      />
      <GoToInputsBtn
        serverInputInfo={serverBindings?.inputs}
        node={node}
        sendMsg={sendMsg}
      />
    </div>
  );
}

function GoToOutputsBtn({
  serverOutputInfo,
  node: { namedArgs },
  sendMsg,
}: {
  node: ShinyUiNode;
  serverOutputInfo?: ServerBindings["outputs"];
  sendMsg: (msg: MessageToBackend) => void;
}) {
  const current_app_info = useCurrentAppInfo();

  if (
    !(
      current_app_info.mode === "MAIN" && "known_outputs" in current_app_info
    ) ||
    typeof serverOutputInfo === "undefined"
  )
    return null;

  const known_outputs = current_app_info.known_outputs;

  const { outputIdKey, renderScaffold } = serverOutputInfo;

  // I have no idea why I have to do this coercsian but for some reason this
  // keeps getting narrowed to never type for args unless I do it.
  const keyForOutput =
    typeof outputIdKey === "string"
      ? outputIdKey
      : (outputIdKey as PickKeyFn<typeof namedArgs>)(namedArgs);

  const outputId = namedArgs[keyForOutput as keyof typeof namedArgs];
  if (typeof outputId !== "string") return null;

  const existing_output_locations = known_outputs.has(outputId);

  return (
    <TooltipButton
      text={
        existing_output_locations
          ? "Show output declaration in app script"
          : "Create output binding in app server"
      }
      position="left"
      variant="regular"
      onClick={() => {
        if (existing_output_locations) {
          sendMsg({
            path: "FIND-SERVER-USES",
            payload: {
              type: "Output",
              outputId: outputId,
            },
          });
        } else {
          sendMsg({
            path: "INSERT-SNIPPET",
            payload: {
              snippet: `\noutput\\$${outputId} <- ${renderScaffold}`,
              where_in_server: "end",
            },
          });
        }
      }}
    >
      {existing_output_locations ? "Show in server" : "Generate server code"}
    </TooltipButton>
  );
}

function GoToInputsBtn({
  serverInputInfo,
  node: { namedArgs },
  sendMsg,
}: {
  node: ShinyUiNode;
  serverInputInfo?: ServerBindings["inputs"];
  sendMsg: (msg: MessageToBackend) => void;
}) {
  if (typeof serverInputInfo === "undefined") return null;

  const { inputIdKey } = serverInputInfo;

  // I have no idea why I have to do this coercsian but for some reason this
  // keeps getting narrowed to never type for args unless I do it.
  const keyForInputId =
    typeof inputIdKey === "string"
      ? inputIdKey
      : (inputIdKey as PickKeyFn<typeof namedArgs>)(namedArgs);

  const inputId = namedArgs[keyForInputId as keyof typeof namedArgs];

  if (typeof inputId !== "string") return null;

  return (
    <TooltipButton
      text={`Find uses of bound input (input$${inputId}) in app script`}
      position="left"
      variant="regular"
      onClick={() => {
        sendMsg({
          path: "FIND-SERVER-USES",
          payload: { type: "Input", inputId },
        });
      }}
    >
      Find in server
    </TooltipButton>
  );
}
