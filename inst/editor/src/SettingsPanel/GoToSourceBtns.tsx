import type { MessageToBackend } from "communication-types/src/MessageToBackend";

import { useBackendConnection } from "../backendCommunication/useBackendMessageCallbacks";
import { TooltipButton } from "../components/PopoverEl/Tooltip";
import type { ShinyUiNode } from "../main";
import type { ShinyUiNodeInfoUnion } from "../Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";
import type { PickKeyFn } from "../TypescriptUtils";

export function GoToSourceBtns({ node }: { node: ShinyUiNode | null }) {
  const { sendMsg, mode } = useBackendConnection();

  // if (mode !== "VSCODE") return null;
  if (!node) return null;

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
  if (typeof serverOutputInfo === "undefined") return null;

  const { outputIdKey, renderScaffold } = serverOutputInfo;

  // I have no idea why I have to do this coercsian but for some reason this
  // keeps getting narrowed to never type for args unless I do it.
  const keyForOutput =
    typeof outputIdKey === "string"
      ? outputIdKey
      : (outputIdKey as PickKeyFn<typeof uiArguments>)(uiArguments);

  const outputId = uiArguments[keyForOutput];
  if (typeof outputId !== "string") return null;

  return (
    <TooltipButton
      text="Find output declaration in app script"
      position="left"
      variant="regular"
      onClick={() => {
        sendMsg({
          path: "GO-TO-SERVER",
          payload: {
            type: "Output",
            outputId,
            renderScaffold,
          },
        });
      }}
    >
      Find in server
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

  const inputId = uiArguments[keyForInputId];
  if (typeof inputId !== "string") return null;

  return (
    <TooltipButton
      text={`Find uses of bound input (input$${inputId}) in app script`}
      position="left"
      variant="regular"
      onClick={() => {
        sendMsg({
          path: "GO-TO-SERVER",
          payload: { type: "Input", inputId },
        });
      }}
    >
      Find in server
    </TooltipButton>
  );
}
