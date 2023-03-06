import type { MessageToBackend } from "communication-types/src/MessageToBackend";

import { useBackendConnection } from "../backendCommunication/useBackendMessageCallbacks";
import { TooltipButton } from "../components/PopoverEl/Tooltip";
import type { ShinyUiNode } from "../main";
import type { ShinyUiNodeInfoUnion } from "../Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";
import { useCurrentAppInfo } from "../state/app_info";
import type { PickKeyFn } from "../utils/TypescriptUtils";

export function GoToSourceBtns({ node }: { node: ShinyUiNode | null }) {
  const { sendMsg, mode } = useBackendConnection();

  if (mode !== "VSCODE" || !node) return null;

  const { serverBindings } = shinyUiNodeInfo[node.uiName];

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
  node: { uiArguments },
  sendMsg,
}: {
  node: ShinyUiNode;
  serverOutputInfo: Required<ShinyUiNodeInfoUnion>["serverBindings"]["outputs"];
  sendMsg: (msg: MessageToBackend) => void;
}) {
  const current_app_info = useCurrentAppInfo();

  if (
    !(
      current_app_info.mode === "MAIN" && "output_positions" in current_app_info
    ) ||
    typeof serverOutputInfo === "undefined"
  )
    return null;

  const current_output_positions = current_app_info.output_positions;
  const current_server_position = current_app_info.server_pos;

  const { outputIdKey, renderScaffold } = serverOutputInfo;

  // I have no idea why I have to do this coercsian but for some reason this
  // keeps getting narrowed to never type for args unless I do it.
  const keyForOutput =
    typeof outputIdKey === "string"
      ? outputIdKey
      : (outputIdKey as PickKeyFn<typeof uiArguments>)(uiArguments);

  const outputId = uiArguments[keyForOutput as keyof typeof uiArguments];
  if (typeof outputId !== "string") return null;

  const existing_output_locations = current_output_positions[outputId];

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
          // sendMsg({
          //   path: "SHOW-APP-LINES",
          //   payload: existing_output_locations,
          // });
        } else {
          sendMsg({
            path: "INSERT-SNIPPET",
            payload: {
              snippet: `\noutput\\$${outputId} <- ${renderScaffold}`,
              below_line: current_server_position[2] - 1,
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
  node: { uiArguments },
  sendMsg,
}: {
  node: ShinyUiNode;
  serverInputInfo: Required<ShinyUiNodeInfoUnion>["serverBindings"]["inputs"];
  sendMsg: (msg: MessageToBackend) => void;
}) {
  if (typeof serverInputInfo === "undefined") return null;

  const { inputIdKey } = serverInputInfo;

  // I have no idea why I have to do this coercsian but for some reason this
  // keeps getting narrowed to never type for args unless I do it.
  const keyForInputId =
    typeof inputIdKey === "string"
      ? inputIdKey
      : (inputIdKey as PickKeyFn<typeof uiArguments>)(uiArguments);

  const inputId = uiArguments[keyForInputId as keyof typeof uiArguments];

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
